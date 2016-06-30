/**
 * Created by Ellery1 on 16/6/30.
 */
var redirect = require('./redirect'),
    sendRequest = require('./sendRequest');

module.exports = function (type) {

    return function (sreq, sres) {

        var opts;

        if (type === 'https') {

            sreq.url = 'https://' + sreq.headers.host + sreq.url;
        }

        opts = redirect(sreq, sres);

        if (type === 'https') {

            opts.rejectUnauthorized = false;
        }

        if (opts) {

            sendRequest(opts, opts.protocol, sreq, sres);
        }
    }
};