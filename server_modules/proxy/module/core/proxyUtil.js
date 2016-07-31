/**
 * Created by Ellery1 on 15/7/30.
 */
var fs = require('fs'),
    service = require('../../../service');

function rewrite(url, context) {

    var config = service.getConfig();

    var rules = context ? context : config.rewrite,
        matchedRules,
        matchedRule,
        responder,
        pattern,
        murl,
        mresRaw = [],
        mresponder = {},
        rewriteUrl = url,
        redirected = false,
        mLocal,
        identifier,
        isLocal = false;

    var rmres = /\$(\d)/g,
        rlocal = /^\s*(\/|file:\/\/|[A-Z]:)/;

    //这里是为了捕获new RegExp可能产生的异常
    //因为一个不符合正则表达式规范的字符串可能会抛出这个异常
    //如果有异常就直接返回原url
    try {

        matchedRules = rules.filter(function (rule) {

            return rule.pattern && rule.isOn && (new RegExp(rule.pattern).test(url));
        });

        if (matchedRules.length) {

            matchedRule = matchedRules[0];
            pattern = matchedRule.pattern;
            responder = matchedRule.responder;
            murl = url.match(pattern);
            mresRaw = responder.match(rmres);

            if (mresRaw) {

                mresRaw.forEach(function (f) {

                    mresponder[f[1]] = f;
                });

                murl.forEach(function (matched, i) {

                    var flag;

                    if (mresponder[i]) {

                        flag = mresponder[i];
                    }

                    responder = responder.replace(flag, matched);
                });
            }

            rewriteUrl = responder;

            mLocal = rlocal.exec(responder);
            identifier = mLocal && mLocal[1];
            isLocal = !!mLocal;

            if (identifier && identifier === 'file://') {

                rewriteUrl = rewriteUrl.replace(identifier, '');
            }
            else if (rewriteUrl.search(/http:|https:/) === -1) {

                rewriteUrl = 'http://' + rewriteUrl;
            }

            redirected = true;
        }
    }
    catch (e) {

        return {
            isLocal: false,
            redirected: false,
            rewriteUrl: rewriteUrl
        };
    }

    return {
        redirected: redirected,
        rewriteUrl: rewriteUrl,
        isLocal: isLocal
    };
}

function filter(host) {

    var config = service.getConfig(),
        serverInfo = service.getServerInfo();

    var rport = /:(\s*\d+)/,
        port = (host && host.match(rport)) ? host.match(rport)[1] : null;

    if (!host) {

        return {host: null, nocache: config.nocache, port: null};
    }

    host = host.replace(rport, '').trim();

    var result = {
            host: host,
            nocache: config.nocache,
            port: port
        },
        activatedGrpName = config.activated,
        activatedGrp = config.group[activatedGrpName],
        activatedGrpInfo,
        serverListInfo,
        env,
        serverIndex;

    var domainArr, domain;

    for (var i = 0; i < activatedGrp.length; i++) {

        activatedGrpInfo = activatedGrp[i];
        domain = activatedGrpInfo.domain;
        domainArr = domain.split(/(\n|\s|\r)+/);
        domainArr.forEach(function (val, i) {

            domainArr[i] = val.trim();
        });

        if (domainArr.find(function (item) {
                return item === host
            })) {

            env = activatedGrpInfo.current;
            serverIndex = activatedGrpInfo.cache[env];

            if (env === 'custom' && host !== '') {

                result.host = serverIndex ? serverIndex : host;
            }
            else if (env !== 'online') {

                serverListInfo = serverInfo[env];
                result.host = serverListInfo[serverIndex];
            }
            result.isLocal = env === 'local';
            result.isOnline = env === 'online';

            break;
        }
    }

    return result;
}

function logger(host, url, port, protocol, method, renderedUrl) {

    var isLocal = host && host.search('127.0.0.1') !== -1,
        isQunar = url.search('http://qunarzz.com') !== -1,
        tagColor = isLocal ? 'magenta' : isQunar ? 'cyan' : protocol === 'http' ? 'blue' : 'yellow',
        tag = '[INCOMMING ' + (isLocal ? 'LOCAL ' : isQunar ? 'QZZ ' : '') + protocol.toUpperCase() + ' REQUEST] ',
        text = method.toUpperCase() + ' ' + url,
        tail = ' SOURCE_HOST:' + renderedUrl.host + ' , REAL_HOST:' + host + ':' + port;

    console.log([tag[tagColor], text, tail].join(''));
}

module.exports = {
    filter: filter,
    rewrite: rewrite,
    logger: logger
};