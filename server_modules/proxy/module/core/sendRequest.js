/**
 * Created by Ellery1 on 15/9/23.
 */
var Logger = require('../../../logServer').Logger,
    streamThrottleManager = require('../../../throttling');

module.exports = function (opts, clientType, sreq, sres) {
    if (!opts) {
        return;
    }

    var logger = new Logger(),
        method = opts.method,
        host = opts.host,
        client = clientType === 'http:' ? require('http') : require('https');
    opts.agent = false;
    var creq = client
        .request(opts, function (cres) {
            cres.headers['x-jerry-proxy-real-host'] = host;
            cres.headers['x-jerry-proxy-redirect-url'] = opts.redirectUrl;
            sres.writeHead(cres.statusCode, cres.headers);
            console.log(cres.headers);
            cres.on('error', function (err) {
                sres.end(err.stack);
            });

            if (logger.checkShouldBeBlocked(sreq, cres.headers)) {
                logger.collect(cres, 'res')
                    .then(function () {
                        logger.sendBlockLog().setBlockPromise(sres);
                    })
                    .catch(function () {
                        streamThrottleManager.pipe(cres, sres, host);
                        logger.collect(cres, 'res');
                    });
            } else {
                streamThrottleManager.pipe(cres, sres, host);
                logger.collect(cres, 'res');
            }
        })
        .on('error', function (err) {
            sres.writeHead(500, {
              'x-jerry-proxy-real-host': host,
              'x-jerry-proxy-redirect-url': opts.redirectUrl
            })
            sres.end(err.stack);
        });

    if (method === 'get' || method === 'trace') {
        creq.end();
        logger.collect(sreq, 'req', true);
    } else {
        creq.end(sreq.body);
        logger.collect(sreq, 'req');
    }
};