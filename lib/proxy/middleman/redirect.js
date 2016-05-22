/**
 * Created by Ellery1 on 15/9/23.
 * url重写和过滤
 */
var util = require('../util.js'),
    http = require("http"),
    url = require("url"),
    fs = require('fs'),
    logger = require('../util').logger;

module.exports = function (sreq, sres) {

    var redirect,
        redirectUrl,
        renderedUrl,
        method,
        filtered,
        port,
        host,
        nocache,
        sheaders,
        isLocal,
        protocol;

    //第一步过滤,匹配rewrite中的规则
    redirect = util.rewrite(sreq.url);
    isLocal = redirect.isLocal;
    redirectUrl = redirect.rewriteUrl;

    renderedUrl = url.parse(redirectUrl);

    //如果是本地文件
    //直接从本地读取并返回
    if (isLocal) {

        var exists = fs.existsSync(redirectUrl);

        if (!exists) {

            sres.writeHead(404, {
                contentType: 'text/html'
            });
            sres.end('404 Not Found.');
        }
        else {

            fs.readFile(redirectUrl, function (err, data) {

                if (err) {

                    sres.writeHead(500);
                    sres.end(err.toString());
                    return;
                }

                sres.writeHead(200);
                sres.end(data);
            });
        }

        return null;
    }
    //线上资源
    else {
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

        logger(host, sreq.url, port, protocol.replace(':', ''), method, renderedUrl);

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