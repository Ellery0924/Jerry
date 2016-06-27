/**
 * Created by Ellery1 on 15/9/23.
 * 未完工,待填坑
 * 20150929 坑已填
 */
var https = require('https'),
    fs = require('fs'),
    redirect = require('./redirect.js'),
    sendRequest = require('./sendRequest.js');

module.exports = function (sreq, sres) {

    var host = sreq.headers.host,
        path = sreq.url,
        opts;

    sreq.url = 'https://' + host + path;
    opts = redirect(sreq, sres);
    opts.rejectUnauthorized = false;

    if (opts) {

        sendRequest(opts, opts.protocol, sreq, sres)
    }
};