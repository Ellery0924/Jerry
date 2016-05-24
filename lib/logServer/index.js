/**
 * Created by Ellery1 on 16/5/24.
 */
var zlib = require('zlib'),
    io = require('socket.io'),
    app = require('express')(),
    http = require('http').createServer(app),
    wsServer = io(http),
    Promise = require('bluebird'),
    URL = require('url'),
    unzipBody = require('./bodyUtil').unzipBody,
    parseBody = require('./bodyUtil').parseBody;

function sendLog(req, res, bodies) {

    wsServer.sockets.emit('log', {
        request: {
            headers: req.headers,
            body: bodies[0]
        },
        response: {
            headers: res.headers,
            body: bodies[1]
        },
        method: req.method,
        url: req.url,
        parsedUrl: URL.parse(req.url)
    });
}

module.exports = {
    wsServer: wsServer,
    initLog: function (req, res) {

        Promise.all([unzipBody(req), unzipBody(res)])
            .then(function (rets) {

                sendLog(req, res, [parseBody(rets[0]), parseBody(rets[1])]);
            })
            .catch(function (rets) {

                console.log('wsSocket:sendLog error, message:' + JSON.stringify(rets));
            });
    }
};

