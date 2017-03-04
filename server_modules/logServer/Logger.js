require('babel-polyfill');
var wsServer = require('./wsServer'),
    URL = require('url'),
    unzipBody = require('./bodyHelper').unzipBody,
    parseBody = require('./bodyHelper').parseBody,
    queryToObj = require('./bodyHelper').queryToObj,
    zipBody = require('./bodyHelper').zipBody,
    fixJsonp = require('./bodyHelper').fixJsonp,
    service = require('../service'),
    blackList = require('./blacklist');
var logPool = [],
    blockPointCount = 0,
    guid = -1;

function defer() {
    var resolve = null, reject = null;
    var promise = new Promise(function () {
        resolve = arguments[0];
        reject = arguments[1];
    });
    return {
        resolve: resolve,
        reject: reject,
        promise: promise
    };
}

function Logger() {
    this.req = null;
    this.res = null;
    this.rets = [];
    this.blockPromise = null;
    this.guid = ++guid;
    this.blocked = false;
}

Logger.instances = [];
Logger.removeInstance = function (instance) {
    Logger.instances = Logger.instances.filter(function (ins) {
        return ins !== instance;
    });
};

Logger.prototype = {
    checkShouldBeBlocked: function (req, resHeaders) {
        var blockPointSetting = service.getBlockPointSetting(),
            url = req.url.replace(/\?.+/, ''),
            blList = blockPointSetting.list,
            validList = blList.filter(function (singleSetting) {
                return singleSetting.isOn;
            }),
            contains = validList.some(function (singleSetting) {
                try {
                    return singleSetting.regex && url.search(singleSetting.regex) !== -1;
                }
                catch (e) {
                    return false;
                }
            });

        if (contains) {
            console.log('Block Point:' + url);
            this.blocked = true;
            this.resHeaders = resHeaders;
            blockPointCount++;
            return true;
        } else {
            return false;
        }
    },
    parseLog: function (req, res, bodies) {
        var parsedUrl = req.url ? URL.parse(req.url) : "",
            parsedQuery = {};

        if (parsedUrl.query) {
            parsedQuery = queryToObj(parsedUrl.query);
        }

        var parsedObj = {
            guid: this.guid,
            request: {
                headers: req.headers,
                body: bodies[0] && bodies[0].json.parsed,
                raw: bodies[0].raw,
                jsonp: bodies[0] && bodies[0].json.jsonp,
                query: parsedQuery
            },
            response: {
                headers: res.headers,
                body: bodies[1] && bodies[1].json.parsed,
                jsonp: bodies[1] && bodies[1].json.jsonp,
                raw: bodies[1].raw
            },
            statusCode: res.statusCode,
            method: req.method,
            url: req.url,
            time: new Date().toString(),
            parsedUrl: parsedUrl
        };

        this.logData = parsedObj;
        if (!this.blocked) {
            logPool.push(parsedObj);
        } else {
            Logger.instances.push(this);
        }
    },
    setBlockPromise: function (sres) {
        var self = this;

        this.blockPromise = defer();
        this.blockPromise.promise
            .then(function (modifiedBody) {
                return zipBody(self.resHeaders, modifiedBody)
            })
            .then(function (body) {
                try {
                    sres.writeHead(self.logData.statusCode, Object.assign({}, self.resHeaders, {
                        'content-length': body.byteLength
                    }));
                    sres.end(body);
                    Logger.removeInstance(self);
                }
                catch (e) {
                    console.log(e.stack);
                }
            })
            .catch(function (msg) {
                if (msg === 'abort') {
                    sres.writeHead(403, "Response was manually abort", {
                        'Content-Type': 'application/json;charset=utf-8'
                    });
                    Logger.removeInstance(self);
                }
                sres.end();
            });
        return this;
    },
    sendBlockLog: function () {
        if (this.logData.response.body === "not a valid json") {
            this.logData.response.body = this.logData.response.raw;
        }
        wsServer.sockets.emit('blockpoint', [Object.assign(this.logData, { type: 'blockpoint' })]);
        return this;
    },
    _checkIfInBlackList: function () {
        var url = this.req.url;
        return blackList.some(function (str) {
            return url.search(str) !== -1;
        });
    },
    collect: function (stream, type, noBody) {
        var self = this;
        return new Promise(function (resolve) {
            if (type === 'req') {
                self.req = stream;
                if (self._checkIfInBlackList()) {
                    return;
                }
            } else if (type === 'res') {
                self.res = stream;
                if (self._checkIfInBlackList()) {
                    return;
                }
            }

            if (!noBody) {
                unzipBody(stream).then(function (ret) {
                    self.rets.push(parseBody(ret));
                    if (self.rets.length === 2) {
                        self.parseLog(self.req, self.res, self.rets);
                        resolve();
                    }
                }).catch(function (msg) {
                    console.log(msg, self.req.url);
                });
            } else {
                self.rets.push("");
            }
        });
    }
};

function sendLog() {
    if (logPool.length !== 0 && blockPointCount === 0) {
        wsServer.sockets.emit('log', logPool.slice());
        logPool = [];
    }
}

function handler(blockPoint, type, isBlocked, noJsonp) {
    var instance = Logger.instances.find(function (ins) {
        return ins.guid === blockPoint.guid;
    });

    if (instance && instance.blocked) {
        if (type === 'continue') {
            instance.blockPromise.resolve(!noJsonp ? fixJsonp(blockPoint.response) : blockPoint.response.body);
            instance.isProposed = true;
            console.log('Block Point Release:' + blockPoint.url);
            if (!isBlocked) {
                blockPointCount = 0;
            }
        } else if (type === 'abort') {
            instance.blockPromise.reject('abort');
            instance.isProposed = true;
            console.log('Block Point Abort:' + blockPoint.url);
            if (!isBlocked) {
                blockPointCount = 0;
            }
        }
    }
}

function resendBlockLog() {
    var blockPointLogList = Logger.instances
        .filter(function (ins) {
            return ins.blocked && !ins.isProposed && ins.logData;
        })
        .map(function (ins) {
            return Object.assign(ins.logData, { type: "blockpoint" });
        });

    if (blockPointLogList.length) {
        wsServer.sockets.emit('blockpoint', blockPointLogList);
    }
}

function init() {
    setInterval(sendLog, 200);
    wsServer.on('connection', function (socket) {
        resendBlockLog();
        socket
            .on('blockPointContinue', function (blockPoint, isBlocked, noJsonp) {
                handler(blockPoint, 'continue', isBlocked, noJsonp);
            })
            .on('blockPointAbort', function (blockPoint, isBlocked) {
                handler(blockPoint, 'abort', isBlocked);
            })
            .on('refreshLog', sendLog);
    });
}

module.exports = {
    init: init,
    klass: Logger
};