/**
 * Created by Ellery1 on 16/6/30.
 */
var redirect = require('./redirect'),
    sendRequest = require('./sendRequest');

module.exports = function (type) {

    return function (sreq, sres) {

        var opts;
        sreq.url = type === 'https' ? 'https://' + sreq.headers.host + sreq.url : sreq.url;
        opts = redirect(sreq, sres);
        opts.rejectUnauthorized = type === 'https' ? false : null;
        
        if (opts) {

            sendRequest(opts, opts.protocol, sreq, sres);
        }
    }
};