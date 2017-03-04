/**
 * Created by Ellery1 on 15/9/23.
 * url重写和过滤
 */
var util = require('./core'),
    http = require("http"),
    url = require("url"),
    fs = require('fs'),
    extractJSONPFuncName = util.extractJSONPFuncName;

module.exports = function (sreq, sres) {
    var redirect,
        redirectUrl,
        responseData,
        renderedUrl,
        method,
        filtered,
        port,
        host,
        nocache,
        sheaders,
        isLocal,
        jsonpCallback,
        jsonpRetFuncName,
        contentType,
        protocol;
    //第一步过滤,匹配rewrite中的规则
    redirect = util.rewrite(sreq.url,sreq.body);
    responseData = redirect.responseData;
    isLocal = redirect.isLocal;
    redirectUrl = redirect.rewriteUrl;
    jsonpCallback = redirect.jsonpCallback;
    contentType = redirect.contentType;
    jsonpRetFuncName = extractJSONPFuncName(jsonpCallback, sreq.url);
    renderedUrl = redirectUrl ? url.parse(redirectUrl) : null;

    //如果是本地文件
    //直接从本地读取并返回
    if (isLocal) {
        if (!responseData) {
            var exists = fs.existsSync(redirectUrl);
            if (!exists) {
                sres.writeHead(404, {
                    contentType: 'text/html;charset=utf-8'
                });
                sres.end('404 Not Found.');
            } else {
                fs.readFile(redirectUrl, function (err, data) {
                    if (err) {
                        sres.writeHead(500);
                        sres.end(err.toString());
                        return;
                    }
                    if (jsonpRetFuncName) {
                        data = jsonpRetFuncName + '(' + data + ');';
                    }

                    sres.writeHead(200, {
                        'Content-Type': contentType + ';charset=utf-8',
                        'Local-Path': redirectUrl,
                        'Access-Control-Allow-Origin': '*'
                    });
                    sres.end(data);
                });
            }
        } else {
            sres.writeHead(200, {
                'Content-Type': contentType + ';charset=utf-8',
                'Access-Control-Allow-Origin': '*'
            });
            responseData = JSON.stringify(responseData);
            if (jsonpRetFuncName) {
                responseData = jsonpRetFuncName + '(' + responseData + ');';
            }
            sres.end(responseData);
        }

        return null;
    } else {
        //第二步过滤,匹配转发分组中的规则
        filtered = util.filter(renderedUrl.host);
        if (!filtered) {
            return;
        }

        protocol = renderedUrl.protocol || 'http:';
        port = renderedUrl.port || (protocol === 'http:' ? 80 : 443);
        host = filtered.host;
        nocache = filtered.nocache;
        sheaders = sreq.headers;
        method = sreq.method.toLowerCase();

        if (redirect.redirected && sreq.headers.host) {
            sheaders.host = host;
        }
        if (nocache) {
            sheaders['cache-control'] = 'no-cache';
        }

        return {
            host: host,
            port: port,
            path: renderedUrl.path,
            headers: sheaders,
            method: method,
            nocache: nocache,
            protocol: protocol
        };
    }
};