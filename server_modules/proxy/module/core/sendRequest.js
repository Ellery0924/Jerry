/**
 * Created by Ellery1 on 15/9/23.
 */
var Logger = require('../../../logServer').Logger,
    streamThrottleManager = require('./streamThrottleManager');

module.exports = function (opts, clientType, sreq, sres) {

    if (!opts) {

        return;
    }

    var logger = new Logger();

    var method = opts.method,
        nocache = opts.nocache,
        host = opts.host,
        client = clientType === 'http:' ? require('http') : require('https');

    var creq = client
        .request(opts, function (cres) {

            if (nocache) {

                cres.headers['cache-control'] = 'no-cache';
                cres.headers['expires'] = -1;
                cres.headers['pragma'] = 'no-cache';
            }

            cres.headers['real-host'] = host;

            try {

                sres.writeHead(cres.statusCode, cres.headers);

                cres.on('error', function (err) {

                    console.log('Proxy Cres Error ' + err);
                    sres.end(err.toString());
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
                }
                else {

                    streamThrottleManager.pipe(cres, sres, host);
                    logger.collect(cres, 'res');
                }
            }
            catch (err) {

                console.log('Log Error ' + err.stack);
            }
        })
        .on('error', function (err) {

            console.log('Proxy Creq Error ' + err);
            sres.end(err.toString());
        });

    if (method === 'post' || method === 'put') {

        streamThrottleManager.pipe(sreq, creq, host);
        logger.collect(sreq, 'req');
    }
    else {

        creq.end();
        logger.collect(sreq, 'req', true);
    }
};