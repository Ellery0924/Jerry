/**
 * Created by Ellery1 on 16/6/30.
 */
var redirect = require('./core/redirect'),
    sendRequest = require('./core/sendRequest');

module.exports = function (type) {
    return function (sreq, sres) {
        var bfs = [];
        sreq
            .on('data', function (trunk) {
                bfs.push(trunk);
            })
            .on('end', function () {
                var buf = Buffer.concat(bfs).toString();
                sreq.body = buf;
                var opts;
                sreq.url = type === 'https' ? 'https://' + sreq.headers.host + sreq.url : sreq.url;
                opts = redirect(sreq, sres);

                if (opts) {
                    opts.rejectUnauthorized = type === 'https' ? false : null;
                    sendRequest(opts, opts.protocol, sreq, sres);
                }
            })
            .on('error', function (err) {
                console.log(err.stack);
            });
    }
};