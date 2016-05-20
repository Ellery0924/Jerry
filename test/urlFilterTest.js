/**
 * Created by Ellery1 on 15/8/10.
 */
var urlFilter = require('../proxy/util'),
    assert = require('assert'),
    fs = require('fs');

var testUrl = 'http://qunarzz.com/ugc/prd/scripts/a/pages/home/home.js?8cf1bbcd9d3bbc53';

var rules = [
    {
        pattern: /http:\/\/qunarzz\.(.*)\/(.*)/,
        responder: 'http://te.qunarzz.$1/$2'
    }
];

var result = urlFilter.rewrite(testUrl, rules);

assert.equal(
    result.rewriteUrl,
    'http://te.qunarzz.com/ugc/prd/scripts/a/pages/home/home.js?8cf1bbcd9d3bbc53',
    ["测试未通过!"]
);

console.log('测试通过!');