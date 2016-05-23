/**
 * Created by Ellery1 on 15/9/23.
 */
var redirect = require('./redirect.js'),
    sendRequest = require('./sendRequest.js');

module.exports = function (sreq, sres) {

    var opts = redirect(sreq, sres);

    if (opts) {
        
        sendRequest(
            opts,
            opts.protocol, sreq, sres
        );
    }
};