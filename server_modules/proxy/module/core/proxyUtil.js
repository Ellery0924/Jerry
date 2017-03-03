/**
 * Created by Ellery1 on 15/7/30.
 */
require('babel-polyfill');
var fs = require('fs'),
    service = require('../../../service'),
    Path = require('path'),
    Url = require('url');

var rmres = /\$(\d)/g,
    rlocal = /^\s*(\.|\/|file:\/\/|[A-Z]:)/,
    rremote = /^\s*https:|http:/;

function getRewriteRules(config) {
    var activated = config.activated,
        targetGroup = config.group[activated],
        mockServices = config.mockServices,
        mockConfigObj = service.getMockConfig(activated),
        isMockActivated = targetGroup && mockServices ? !!mockServices.find(function (gname) {
                return gname === activated
            }) : false;

    if (mockConfigObj && isMockActivated) {
        var mockConfig = mockConfigObj.mockConfig,
            projectPath = mockConfigObj.projectPath;

        if (mockConfig) {
            return mockConfig
                .map(function (mconfig) {
                    var pattern = mconfig.pattern,
                        currentEnv = mconfig.current,
                        responders = mconfig.responders,
                        responder = mconfig.responder,
                        jsonpCallback = mconfig.jsonpCallback,
                        contentType = mconfig.contentType || 'application/json';

                    if (pattern) {
                        if (currentEnv && currentEnv !== 'online' && responders) {
                            var currentResponder = responders[currentEnv];

                            if (currentResponder) {
                                if (!rremote.test(currentResponder)) {
                                    currentResponder = Path.resolve(projectPath, currentResponder);
                                }

                                return {
                                    isOn: 1,
                                    pattern: pattern,
                                    responder: currentResponder,
                                    jsonpCallback: jsonpCallback,
                                    contentType: contentType
                                };
                            }
                        } else if (responder) {
                            if (typeof pattern === 'string') {
                                if (pattern.charAt(pattern.length - 1) !== '$') {
                                    pattern += '$';
                                }
                            }

                            if (typeof responder === 'string' && !Path.isAbsolute(responder) && !responder.match(/^(https?:)?\/\//)) {
                                responder = Path.resolve(projectPath, responder);
                            }

                            return {
                                isOn: 1,
                                pattern: pattern,
                                responder: responder,
                                jsonpCallback: jsonpCallback,
                                contentType: contentType
                            };
                        }
                    }

                    return null;
                })
                .concat(config.rewrite)
                .filter(function (config) {
                    return config !== null;
                });
        }
    }

    return config.rewrite;
}

function rewrite(url, body) {
    var config = service.getConfig();
    var rules = getRewriteRules(config),
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
        isLocal = false,
        jsonpCallback,
        contentType = 'text/html',
        responseData = null;
    //这里是为了捕获new RegExp可能产生的异常
    //因为一个不符合正则表达式规范的字符串可能会抛出这个异常
    //如果有异常就直接返回原url
    try {
        matchedRules = rules.filter(function (rule) {
            var pattern = rule.pattern;
            return rule.pattern && rule.isOn && (new RegExp(rule.pattern).test(url));
        });

        if (matchedRules.length) {
            matchedRule = matchedRules[0];
            pattern = matchedRule.pattern;
            responder = matchedRule.responder;
            jsonpCallback = matchedRule.jsonpCallback;
            contentType = matchedRule.contentType || 'text/html';

            if (typeof responder !== 'object' && typeof responder !== 'function') {
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
                isLocal = !rremote.test(responder);

                if (identifier && identifier === 'file://') {
                    rewriteUrl = rewriteUrl.replace(identifier, '');
                }

                redirected = true;
            } else {
                isLocal = true;
                redirected = true;
                rewriteUrl = null;
                responseData = typeof responder === 'function' ? responder(Url.parse(url), body) : responder;
            }
        }
    } catch (e) {
        return {
            isLocal: false,
            redirected: false,
            rewriteUrl: rewriteUrl,
            responseData: responseData
        };
    }

    return {
        redirected: redirected,
        rewriteUrl: rewriteUrl,
        isLocal: isLocal,
        responseData: responseData,
        jsonpCallback: jsonpCallback,
        contentType: contentType
    };
}

function filter(host) {
    var config = service.getConfig(),
        serverInfo = service.getServerInfo();
    var rport = /:(\s*\d+)/,
        port = host && host.match(rport) ? host.match(rport)[1] : null;

    if (!host) {
        return { host: null, nocache: config.nocache, port: null };
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
        serverIndex,
        domainArr,
        domain;

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
            } else if (env !== 'online') {
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

function extractJSONPFuncName(jsonpCallback, url) {
    var rjsonpParam = new RegExp(jsonpCallback + '=([^&]+)'),
        mjsonpParam = url.match(rjsonpParam);

    if (mjsonpParam && mjsonpParam.length === 2) {
        return mjsonpParam[1];
    }
    return null;
}

module.exports = {
    filter: filter,
    rewrite: rewrite,
    logger: logger,
    extractJSONPFuncName: extractJSONPFuncName
};