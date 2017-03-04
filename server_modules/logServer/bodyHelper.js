/**
 * Created by Ellery1 on 16/5/24.
 */
var zlib = require('zlib'),
    Promise = require('bluebird');
var VERY_LONG_STRING_LEN = 1024 * 1024 * 2;

function queryToObj(queryStr) {
    return queryStr.split('&').reduce(function (acc, query) {
        var splitQuery = query.split('=');
        acc[splitQuery[0]] = splitQuery[1];
        return acc;
    }, {});
}

function zipBody(headers, str) {
    return new Promise(function (resolve, reject) {
        var encoding = headers['content-encoding'];
        var buf = new Buffer(str, 'utf8');

        if (encoding === 'gzip') {
            zlib.gzip(buf, function (err, result) {
                !err ? resolve(result) : reject(err);
            });
        } else if (encoding === 'deflate') {

            zlib.deflate(buf, function (err, result) {
                !err ? resolve(result) : reject(err);
            });
        } else {
            resolve(buf);
        }
    });
}

function unzipBody(stream) {
    var buffers = [], size = 0;
    return new Promise(function (resolve, reject) {
        stream
            .on('data', function (chunk) {
                buffers.push(chunk);
                size += chunk.length;
            })
            .on('end', function () {
                var encoding = stream.headers['content-encoding'],
                    buf = Buffer.concat(buffers, size);

                if (size < VERY_LONG_STRING_LEN) {
                    if (encoding === 'gzip') {
                        zlib.gunzip(buf, function (err, data) {
                            !err ? resolve(data.toString()) : reject(err);
                        });
                    } else if (encoding === 'deflate') {
                        zlib.inflate(buf, function (err, data) {
                            !err ? resolve(data.toString()) : reject(err);
                        });
                    } else {
                        resolve(buf.toString());
                    }
                } else {
                    reject('TOO_LONG_TO_BE_PARSED');
                }
            })
            .on('error', function (err) {
                reject(err);
            });
    });
}

function _extractJSON(jsonStr) {
    if (jsonStr.length >= VERY_LONG_STRING_LEN) {
        console.log('very long!', jsonStr.length);
        return { parsed: 'Too long to be parsed.', jsonp: null, abort: true };
    }

    if (!jsonStr) {
        return { parsed: null, jsonp: null };
    }

    var rjson = /(^|^\s*[\w\d_\$\.]+\()\s*(\{(?:.|[\n\r])*}|\[(?:.|[\n\r])*])(?:\s*$|\))/,
        mjson = jsonStr.match(rjson),
        rquery = /^\s*([\w\d_\$]+=[^&]*&?)+\s*$/;

    if (mjson) {
        try {
            return { parsed: JSON.parse(mjson[2]), jsonp: mjson[1] };
        }
        catch (e) {
            return { parsed: "not a valid json", jsonp: null };
        }
    } else if (rquery.test(jsonStr)) {
        return { parsed: queryToObj(jsonStr), jsonp: null };
    }

    return { parsed: "not a valid json", jsonp: null };
}

function parseBody(body) {
    return { raw: body, json: _extractJSON(body) };
}

function fixJsonp(response) {
    if (response.jsonp) {
        return response.jsonp + response.body + ")";
    } else {
        return response.body;
    }
}

module.exports = {
    zipBody: zipBody,
    unzipBody: unzipBody,
    parseBody: parseBody,
    queryToObj: queryToObj,
    fixJsonp: fixJsonp
};