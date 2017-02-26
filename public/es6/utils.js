/**
 * Created by Ellery1 on 15/8/3.
 */
import _ from 'underscore';

export function validateGroupName(groupName, groupList) {
    const result = groupName && !groupList[groupName],
        ERROR_MESSAGE = '请输入合法的组名!';

    return {
        result: result,
        message: result ? null : ERROR_MESSAGE
    };
}

//验证当前新增的规则是否合法
export function validateDomain(domain, index, ruleList) {
    const ERROR_MESSAGE = {
        EMPTY: '域不能为空!',
        NOT_VALID: '请输入一个合法的域!(请注意不要与当前已经定义的规则重复)',
        NOT_VALID_HOST: '不是一个合法的域!'
    };
    let rule,
        ret = {
            result: true
        };

    if (!domain) {
        return {
            result: false,
            message: ERROR_MESSAGE.EMPTY
        };
    }

    let srcDomainArr;
    const rsplitter = /[\s\n\r]+/,
        currentDomainArr = domain.split(rsplitter);

    for (let i = 0; i < currentDomainArr.length; i++) {
        const subDomain = currentDomainArr[i];
        if (!validateHost(subDomain)) {
            return {
                result: false,
                message: subDomain + ERROR_MESSAGE.NOT_VALID_HOST
            }
        }
    }

    for (let i = 0; i < ruleList.length; i++) {
        if (index === undefined || index !== undefined && i !== index) {
            rule = ruleList[i];
            srcDomainArr = rule.domain.split(rsplitter);

            for (let j = 0; j < currentDomainArr.length; j++) {
                const subD = currentDomainArr[j];
                if (_.contains(srcDomainArr, subD)) {
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
    return rhost.test(host)
}

export function validateMultiDomain(ruleList, existedRuleList) {
    const ERR_MESSAGE = {
        EMPTY: '请输入规则!',
        REDUNDANT: '当前输入规则中存在重复的规则: ',
        NOT_VALID: '存在非法的域: ',
        NOT_VALID_IP: '存在非法的IP:'
    };

    if (!ruleList || !ruleList.length) {
        return {
            result: false,
            message: ERR_MESSAGE.EMPTY
        }
    }

    for (var i = 0; i < ruleList.length; i++) {
        var rule = ruleList[i],
            domain = rule.domain,
            ip = rule.ip;

        if (_.where(ruleList, { domain: domain }).length > 1) {
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
            }
        }
    }

    return {
        result: true
    };
}

export function validatePattern(pattern, responder, patterList) {
    var ERROR_MESSAGE = "Pattern非法,请检查.",
        result = pattern &&
            pattern.search(/\s+/g) === -1 &&
            responder && !_.findWhere(patterList, { pattern: pattern });

    return {
        result: result,
        message: ERROR_MESSAGE
    }
}

export function validateServerConfig(serverConfig) {
    const ERROR_MESSAGE = "非法的JSON字符串,请检查.";

    try {
        JSON.parse(serverConfig);
    }
    catch (e) {
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

import { getServerByIp, formatRuleListGenerator, exportHostList } from '../../server_modules/service/hostUtils';

exports.getServerByIp = getServerByIp;
exports.formatRuleList = formatRuleListGenerator(validateMultiDomain);
exports.exportHostList = exportHostList;

export function isFunction(arg) {
    return typeof arg === 'function';
}

export function isNumber(arg) {
    return typeof arg === 'number';
}

export function isString(arg) {
    return typeof arg === 'string';
}

export function isObject(arg) {
    return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
    return arg === void 0;
}