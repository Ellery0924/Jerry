var wsServer = require('./wsServer'),
    URL = require('url'),
    unzipBody = require('./bodyUtil').unzipBody,
    parseBody = require('./bodyUtil').parseBody,
    queryToObj = require('./bodyUtil').queryToObj,
    service = require('../service'),
    blockPointSetting = service.getBlockPointSetting();

var logPool = [],
    autoSend = true,
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
    checkShouldBeBlocked: function (req) {

        var blList = blockPointSetting.list,
            validList = blList.filter(function (singleSetting) {
                return singleSetting.isOn;
            }),
            contains = validList.some(function (singleSetting) {
                return singleSetting.regex.test(req.url);
            });

        if (contains) {

            this.blocked = true;
            autoSend = false;
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
                body: bodies[0].json,
                raw: bodies[0].raw,
                query: parsedQuery
            },
            response: {
                headers: res.headers,
                body: bodies[1].json,
                raw: bodies[1].raw
            },
            statusCode: res.statusCode,
            method: req.method,
            url: req.url,
            time: new Date().toString(),
            parsedUrl: parsedUrl
        };

        this.logData = parsedObj;
        logPool.push(parsedObj);
    },
    _modifyResponse(modifiedBody){

        return this.res;
    },
    _setBlockPromise(sres){

        this.blockPromise = defer();
        this.blockPromise.promise.then(function (modifiedBody) {

            this._modifyResponse(modifiedBody).pipe(sres);
        });
    },
    sendBlockLog: function () {

        wsServer.sockets.emit('blockpoint', this.logData);
    },
    collect: function (stream, type, noBody) {

        var self = this;

        if (type === 'req') {

            this.req = stream;
        }
        else if (type === 'res') {

            this.res = stream;
        }

        if (!noBody) {

            unzipBody(stream).then(function (ret) {

                self.rets.push(parseBody(ret));

                if (self.rets.length === 2) {

                    self._parseLog(self.req, self.res, self.rets);
                }
            });
        }
        else {

            self.rets.push("");
        }
        return this;
    }
};

function sendLog() {

    if (logPool.length !== 0 && autoSend) {

        wsServer.sockets.emit('log', logPool.slice());
        logPool = [];
    }
}

wsServer
    .on('blockPointContinue', function (id, modifiedBody) {

        var instance = Logger.instances.find(function (ins) {
            return ins.guid === id;
        });

        if (instance && instance.blocked) {

            instance.blockPromise.resolve(modifiedBody);
        }
        autoSend = true;
    });

module.exports = {
    sendLog: sendLog,
    klass: Logger
};