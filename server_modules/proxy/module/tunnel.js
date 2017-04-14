var net = require('net'),
    util = require('./core/core'),
    URL = require('url'),
    fs = require('fs'),
    service = require('../../service');

module.exports = function (req, socket) {
    var config = service.getConfig(),
        url = req.url,
        httpsOn = !!config.httpsOn,
        netClient,
        mport = url.match(/:(\d+)$/),
        urlPort = 443,
        wsPort = Number(config.wsPort),
        isWsConnection = false;

    if (mport) {
        urlPort = Number(mport[1]);
        isWsConnection = urlPort === wsPort;
    }

    if (isWsConnection) {
        console.log('websocket connect: ', url);
    }

    //http隧道
    if (!httpsOn) {
        if (url.search(/http|https/) === -1) {
            url = (!isWsConnection ? 'https://' : 'ws://') + url;
        }

        var rewriteUrl = util.rewrite(url).rewriteUrl,
            parsedUrl = URL.parse(rewriteUrl),
            host = util.filter(parsedUrl.host).host,
            port = parsedUrl.port || 443;

        if (isWsConnection) {
            console.log('websocket connection is redirected to', host, port);
        }

        if (host) {
            netClient = net.createConnection({
                host: host,
                port: port
            });
        }
    } else {
        netClient = net.createConnection(config.httpsPort);
    }

    if (netClient) {
        netClient.on('connect', function () {
            socket.write("HTTP/1.1 200 Connection established\r\nProxy-agent: Netscape-Proxy/1.1\r\n\r\n");
        });

        socket
            .on('data', function (chunk) {
                netClient.write(chunk);
            })
            .on('end', function () {
                netClient.end();
            })
            .on('close', function () {
                netClient.end();
            })
            .on('error', function () {
                netClient.end();
            });

        netClient
            .on('data', function (chunk) {
                socket.write(chunk);
            })
            .on('end', function () {
                socket.end();
            })
            .on('close', function () {
                socket.end();
            })
            .on('error', function () {
                socket.end();
            });
    }
};