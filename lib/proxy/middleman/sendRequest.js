/**
 * Created by Ellery1 on 15/9/23.
 */
module.exports = function (opts, clientType, sreq, sres) {

    if (!opts) {

        return;
    }

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

            sres.writeHead(cres.statusCode, cres.headers);

            cres.on('error', function (err) {

                console.log('cres error:' + err);
                sres.end(err.toString());
            });

            cres.pipe(sres);
        })
        .on('error', function (err) {

            console.log('creq error:' + err);
            sres.end(err.toString());
        });

    if (method === 'post' || method === 'put') {

        sreq.pipe(creq);
    }
    else {

        creq.end();
    }
};