/**
 * Created by Ellery1 on 15/7/30.
 */
var fs = require('fs'),
    HOME = process.env.HOME,
    configPath = HOME + "/.qpconfig",
    serverConfigPath = HOME + '/.qsconfig',
    defaultConfig = require('../../defaultConfig.json'),
    defaultServer = require('../../defaultServer.json'),
    privateKeyPath = HOME + '/server.key',
    certificatePath = HOME + '/server.crt',
    key = require('../../ssl/serverkey.js'),
    crt = require('../../ssl/servercrt.js'),
    _ = require('underscore'),
    execSync = require('child_process').execSync;

var _createFileIfNotExists = function (path, content, msg, stringify) {

    if (!fs.existsSync(path)) {

        execSync('touch ' + path);
        execSync('chmod 777 ' + path);
        fs.writeFileSync(path, stringify ? JSON.stringify(content) : content);

        console.log(msg);
    }
};

_createFileIfNotExists(configPath, defaultConfig, "用户配置文件已更新,你可以在~/.qpconfig中手动编辑", true);
_createFileIfNotExists(serverConfigPath, defaultServer, "服务器配置文件已更新,你可以在~/.qsconfig中手动编辑", true);
_createFileIfNotExists(privateKeyPath, key, "key已创建在~/server.key");
_createFileIfNotExists(certificatePath, crt, "certificate已创建在~/server.crt");

module.exports = (function () {

    var config = JSON.parse(fs.readFileSync(configPath)),
        serverInfo = JSON.parse(fs.readFileSync(serverConfigPath));

    global.config = config;

    var getConfig = function () {

        return config;
    };

    var getServerInfo = function () {

        return serverInfo;
    };

    var setConfig = function (conf) {

        config = conf;
        global.config = conf;

        fs.writeFile(configPath, JSON.stringify(config).trim(), function (err) {

            if (err) {

                throw err;
            }

            console.log('~/.qpconfig updated.');
        });
    };

    var setServerInfo = function (serverInfo) {

        fs.writeFile(serverConfigPath, JSON.stringify(serverInfo).trim(), function (err) {

            if (err) {

                throw err;
            }

            console.log('~/.qsconfig updated.');
        });
    };

    var rewrite = function (url, context) {

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

            matchedRules = _.filter(rules, function (rule) {

                return rule.isOn && (new RegExp(rule.pattern).test(url));
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

                    _.each(murl, function (matched, i) {

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
    };

    var filter = function (host) {

        var rport = /:(\s*\d+)/,
            port = (host && host.match(rport)) ? host.match(rport)[1] : null;

        if (!host) {

            return null;
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

            if (_.contains(domainArr, host)) {

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
    };

    var logger = function (host, url, port, protocol, method, renderedUrl) {

        var isLocal = host && host.search('127.0.0.1') !== -1,
            isQunar = url.search('http://qunarzz.com') !== -1,
            tagColor = isLocal ? 'magenta' : isQunar ? 'cyan' : protocol === 'http' ? 'blue' : 'yellow',
            tag = '[INCOMMING ' + (isLocal ? 'LOCAL ' : isQunar ? 'QZZ ' : '') + protocol.toUpperCase() + ' REQUEST] ',
            text = method.toUpperCase() + ' ' + url,
            tail = ' SOURCE_HOST:' + renderedUrl.host + ' , REAL_HOST:' + host + ':' + port;

        console.log([tag[tagColor], text, tail].join(''));
    };

    return {
        getConfig: getConfig,
        setConfig: setConfig,
        getServerInfo: getServerInfo,
        setServerInfo: setServerInfo,
        filter: filter,
        rewrite: rewrite,
        logger: logger
    }
})();