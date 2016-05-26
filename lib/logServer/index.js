/**
 * Created by Ellery1 on 16/5/24.
 */
var io = require('socket.io'),
    app = require('express')(),
    http = require('http').createServer(app),
    wsServer = io(http),
    URL = require('url'),
    unzipBody = require('./bodyUtil').unzipBody,
    parseBody = require('./bodyUtil').parseBody;

function sendLog(req, res, bodies) {

    wsServer.sockets.emit('log', {
        request: {
            headers: req.headers,
            body: bodies[0].json,
            raw: bodies[0].raw
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
        parsedUrl: req.url ? URL.parse(req.url) : ""
    });
}

function Logger() {

    this.req = null;
    this.res = null;
    this.rets = [];
}

Logger.prototype = {
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

                    sendLog(self.req, self.res, self.rets);
                }
            });
        }
        else {

            self.rets.push("");
        }
        return this;
    }
};

module.exports = {
    wsServer: wsServer,
    Logger: Logger
};

