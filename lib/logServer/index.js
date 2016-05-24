/**
 * Created by Ellery1 on 16/5/24.
 */
var zlib = require('zlib'),
    io = require('socket.io'),
    app = require('express')(),
    http = require('http').createServer(app),
    wsServer = io(http),
    Promise = require('bluebird'),
    URL = require('url');

function sendLog(req, res, bodies) {

    wsServer.sockets.emit('log', {
        request: {
            headers: req.headers,
            body: bodies[0]
        },
        response: {
            headers: res.headers,
            body: JSON.stringify(bodies[1])
        },
        method: req.method,
        url: req.url,
        parsedUrl: URL.parse(req.url)
    });
}

function unzipBody(stream) {

    var buffers = [], size = 0;
    return new Promise(function (resolve, reject) {

        stream
            .on('data', function (chunk) {

                buffers.push(chunk);
                size += chunk.length;
            })
            .on('end', function () {

                var encoding = stream.headers['content-encoding'];
                var buf = Buffer.concat(buffers, size);

                if (encoding === 'gzip') {

                    zlib.gunzip(buf, function (err, data) {

                        if (!err) {

                            resolve(data.toString());
                        }
                        else {

                            reject(err);
                        }
                    });
                }
                else if (encoding === 'deflate') {

                    zlib.inflate(buf, function (err, data) {

                        if (!err) {

                            resolve(data.toString());
                        }
                        else {

                            reject(err);
                        }
                    });
                }
                else {

                    resolve(buf.toString(encoding || 'utf-8'));
                }
            })
            .on('error', function (err) {

                reject(err);
            });
    });
}

module.exports = {
    wsServer: wsServer,
    initLog: function (req, res) {

        Promise.all([unzipBody(req), unzipBody(res)])
            .then(function (rets) {

                sendLog(req, res, rets);
            })
            .catch(function (rets) {

                console.log('wsSocket:sendLog error, message:' + JSON.stringify(rets));
            });
    }
};

