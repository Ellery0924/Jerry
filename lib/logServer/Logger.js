var wsServer = require('./wsServer'),
    URL = require('url'),
    unzipBody = require('./bodyUtil').unzipBody,
    parseBody = require('./bodyUtil').parseBody,
    queryToObj = require('./bodyUtil').queryToObj;

var logPool = [];

function Logger() {

    this.req = null;
    this.res = null;
    this.rets = [];
}

Logger.prototype = {
    _parseLog: function (req, res, bodies) {

        var parsedUrl = req.url ? URL.parse(req.url) : "",
            parsedQuery = {};

        if (parsedUrl.query) {

            parsedQuery = queryToObj(parsedUrl.query);
        }

        var parsedObj = {
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
        logPool.push(parsedObj);
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

    if (logPool.length !== 0) {

        wsServer.sockets.emit('log', logPool.slice());
        logPool = [];
    }
}

module.exports = {
    sendLog: sendLog,
    klass: Logger
};