/**
 * Created by Ellery1 on 15/9/23.
 */
var Logger = require('../../logServer').Logger;

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

                    console.log('cres error:' + err);
                    sres.end(err.toString());
                });

                cres.pipe(sres);
                logger.collect(cres, 'res');
            }
            catch (e) {

                console.log(e);
            }
        })
        .on('error', function (err) {

            console.log('creq error:' + err);
            sres.end(err.toString());
        });

    if (method === 'post' || method === 'put') {

        sreq.pipe(creq);
        logger.collect(sreq, 'req');
    }
    else {

        creq.end();
        logger.collect(sreq, 'req', true);
    }
};