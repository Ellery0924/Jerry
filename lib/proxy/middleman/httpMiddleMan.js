/**
 * Created by Ellery1 on 15/9/23.
 */
var http = require("http"),
    redirect = require('./redirect.js'),
    sendRequest = require('./sendRequest.js'),
    fs = require('fs');

module.exports = function (sreq, sres) {

    var opts = redirect(sreq, sres);

    sendRequest(
        opts,
        opts.protocol, sreq, sres
    );
};