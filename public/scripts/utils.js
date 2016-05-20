'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.validateGroupName = validateGroupName;
exports.validateDomain = validateDomain;
exports.validateMultiDomain = validateMultiDomain;
exports.validatePattern = validatePattern;
exports.validateServerConfig = validateServerConfig;
exports.exportHostList = exportHostList;
exports.getServerByIp = getServerByIp;

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; } /**
                                                                                                                              * Created by Ellery1 on 15/8/3.
                                                                                                                              */

function validateGroupName(groupName, groupList) {

    var result = groupName && !groupList[groupName],
        ERROR_MESSAGE = '请输入合法的组名!';

    return {
        result: result,
        message: result ? null : ERROR_MESSAGE
    };
}

//验证当前新增的规则是否合法
function validateDomain(domain, index, ruleList) {

    var ERROR_MESSAGE = {
        EMPTY: '域不能为空!',
        NOT_VALID: '请输入一个合法的域!(请注意不要与当前已经定义的规则重复)',
        NOT_VALID_HOST: '不是一个合法的域!'
    };

    var rule,
        ret = {
        result: true
    };

    if (!domain) {

        return {
            result: false,
            message: ERROR_MESSAGE.EMPTY
        };
    }

    var srcDomainArr,
        rsplitter = /[\s\n\r]+/,
        currentDomainArr = domain.split(rsplitter);

    for (var i = 0; i < currentDomainArr.length; i++) {

        var subDomain = currentDomainArr[i];

        if (!validateHost(subDomain)) {

            return {
                result: false,
                message: subDomain + ERROR_MESSAGE.NOT_VALID_HOST
            };
        }
    }

    for (var i = 0; i < ruleList.length; i++) {

        if (index === undefined || index !== undefined && i !== index) {

            rule = ruleList[i];

            srcDomainArr = rule.domain.split(rsplitter);

            for (var j = 0; j < currentDomainArr.length; j++) {

                var subD = currentDomainArr[j];

                if (_underscore2.default.contains(srcDomainArr, subD)) {

                    return {
                        result: false,
                        message: ERROR_MESSAGE.NOT_VALID
                    };
                }
            }
        }
    }

    return ret;
}

function validateIp(ip) {

    var rip = /^\s*(?:\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}|.+\-\d+)\s*$/;

    return rip.test(ip);
}

function validateHost(host) {

    var rhost = /^\s*([\w\d.-]+\.[\w]+(\s+)?)+\s*$/;

    return rhost.test(host);
}

function validateMultiDomain(ruleList, existedRuleList) {

    var ERR_MESSAGE = {
        EMPTY: '请输入规则!',
        REDUNDANT: '当前输入规则中存在重复的规则: ',
        NOT_VALID: '存在非法的域: ',
        NOT_VALID_IP: '存在非法的IP:'
    };

    if (!ruleList || !ruleList.length) {

        return {
            result: false,
            message: ERR_MESSAGE.EMPTY
        };
    }

    for (var i = 0; i < ruleList.length; i++) {

        var rule = ruleList[i],
            domain = rule.domain,
            ip = rule.ip;

        if (_underscore2.default.where(ruleList, { domain: domain }).length > 1) {

            return {
                result: false,
                message: ERR_MESSAGE.REDUNDANT + domain
            };
        }

        if (!validateDomain(domain, -1, existedRuleList).result) {

            return {
                result: false,
                message: ERR_MESSAGE.NOT_VALID + domain
            };
        }

        if (!validateIp(ip)) {

            return {
                result: false,
                message: ERR_MESSAGE.NOT_VALID_IP + ip
            };
        }
    }

    return {
        result: true
    };
}

function validatePattern(pattern, responder, patterList) {

    var ERROR_MESSAGE = "Pattern非法,请检查.",
        result = pattern && pattern.search(/\s+/g) === -1 && responder && !_underscore2.default.findWhere(patterList, { pattern: pattern });

    return {
        result: result,
        message: ERROR_MESSAGE
    };
}

function validateServerConfig(serverConfig) {

    var ERROR_MESSAGE = "非法的JSON字符串,请检查.";

    try {

        JSON.parse(serverConfig);
    } catch (e) {

        return {
            result: false,
            message: ERROR_MESSAGE
        };
    }

    return {
        result: true,
        message: '服务器配置已更新!'
    };
}

function exportHostList(ruleList, serverInfo) {

    return ruleList && ruleList.length ? ruleList.reduce(function (result, rule) {

        var domainArr = rule.domain.replace(/[\n\r\s]+/, ' ').split(/\s+/),
            current = rule.current,
            isOnline = current === 'online',
            cache = rule.cache,
            selectedServerIndex = cache[current],
            ip = current === 'custom' ? cache.custom : serverInfo[current][selectedServerIndex];

        if (!isOnline) {

            result = result.concat(domainArr.map(function (domain) {
                return ip + ' ' + domain;
            }));
        }

        return result;
    }, []).join('\n') : '';
}

function getServerByIp(ip, serverInfo) {

    var rshortcut = /(.+)\-(\d+)/,
        mshortcut = ip.match(rshortcut);

    if (mshortcut && mshortcut.length) {
        var _ret = (function () {

            var insertGroupName = mshortcut[1],
                insertIpIndex = mshortcut[2],
                targetGroup = serverInfo[insertGroupName];

            if (targetGroup !== undefined) {

                if (Object.keys(targetGroup).some(function (serverIndex) {
                    return serverIndex === insertIpIndex;
                })) {

                    return {
                        v: {
                            groupName: insertGroupName,
                            ipIndex: insertIpIndex
                        }
                    };
                }
            }
        })();

        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
    }

    var groupInfo;

    for (var groupName in serverInfo) {

        if (serverInfo.hasOwnProperty(groupName)) {

            groupInfo = serverInfo[groupName];

            for (var ipIndex in groupInfo) {

                if (groupInfo.hasOwnProperty(ipIndex)) {

                    if (groupInfo[ipIndex] === ip) {

                        return {
                            groupName: groupName,
                            ipIndex: ipIndex
                        };
                    }
                }
            }
        }
    }

    return {
        groupName: 'custom',
        ipIndex: ip
    };
}
//# sourceMappingURL=utils.js.map
