var wsServer = require('./wsServer'),
    URL = require('url'),
    unzipBody = require('./bodyUtil').unzipBody,
    parseBody = require('./bodyUtil').parseBody,
    queryToObj = require('./bodyUtil').queryToObj,
    zipBody = require('./bodyUtil').zipBody,
    fixJsonp = require('./bodyUtil').fixJsonp,
    service = require('../service'),
    _ = require('underscore'),
    blockPointSetting = service.getBlockPointSetting();

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
    Logger.instances.push(this);
}

Logger.instances = [];

Logger.prototype = {
    checkShouldBeBlocked: function (req, resHeaders) {

        var blList = blockPointSetting.list,
            validList = blList.filter(function (singleSetting) {
                return singleSetting.isOn;
            }),
            contains = validList.some(function (singleSetting) {

                try {

                    return new RegExp(singleSetting.regex).test(req.url);
                }
                catch (e) {

                    return false;
                }
            });

        if (contains) {

            this.blocked = true;
            this.resHeaders = resHeaders;
            blockPointCount++;
            return true;
        }
        else {

            return false;
        }
    },
    _parseLog: function (req, res, bodies) {

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
        }
    },
    setBlockPromise(sres){

        var self = this;

        this.blockPromise = defer();
        this.blockPromise.promise
            .then(function (modifiedBody) {

                zipBody(self.resHeaders, modifiedBody)
                    .then(function (body) {

                        try {

                            sres.writeHead(200, Object.assign({}, self.resHeaders, {
                                'content-length': body.byteLength
                            }));
                            sres.end(body);
                        }
                        catch (e) {

                            console.log(e);
                        }
                    })
                    .catch(function () {

                        sres.end();
                    });
            })
            .catch(function () {

                sres.writeHead(403, "Response was manually abort", {
                    'Content-Type': 'application/json;charset=utf-8'
                });
                sres.end();
            });
        return this;
    },
    sendBlockLog: function () {

        if (this.logData.response.body === "not a valid json") {

            this.logData.response.body = this.logData.response.raw;
        }
        wsServer.sockets.emit('blockpoint', [Object.assign(this.logData, {type: 'blockpoint'})]);
        return this;
    },
    collect: function (stream, type, noBody) {

        var self = this;

        return new Promise(function (resolve) {

            if (type === 'req') {

                self.req = stream;
            }
            else if (type === 'res') {

                self.res = stream;
            }

            if (!noBody) {

                unzipBody(stream).then(function (ret) {

                    self.rets.push(parseBody(ret));

                    if (self.rets.length === 2) {

                        self._parseLog(self.req, self.res, self.rets);
                        resolve();
                    }
                });
            }
            else {

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

function _handler(blockPoint, type, isBlocked) {

    var instance = Logger.instances.find(function (ins) {

        return ins.guid === blockPoint.guid;
    });

    if (instance && instance.blocked) {

        if (type === 'continue') {

            instance.blockPromise.resolve(fixJsonp(blockPoint.response));
            instance.isProposed = true;

            if (!isBlocked) {

                blockPointCount = 0;
            }
        }
        else if (type === 'abort') {

            instance.blockPromise.reject();
            instance.isProposed = true;

            if (!isBlocked) {

                blockPointCount = 0;
            }
        }
    }
}

function _resendBlockLog() {

    var blockPointLogList = Logger.instances
        .filter(function (ins) {

            return ins.blocked && !ins.isProposed;
        })
        .map(function (ins) {

            return Object.assign(ins.logData, {type: "blockpoint"});
        });

    wsServer.sockets.emit('blockpoint', blockPointLogList);
}

function init() {

    setInterval(sendLog, 200);

    wsServer.on('connection', function (socket) {

        _resendBlockLog();

        socket
            .on('blockPointContinue', function (blockPoint, isBlocked) {

                _handler(blockPoint, 'continue', isBlocked);
            })
            .on('blockPointAbort', function (blockPoint, isBlocked) {

                _handler(blockPoint, 'abort', isBlocked);
            });
    });
}

module.exports = {
    init: init,
    klass: Logger
};