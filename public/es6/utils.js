/**
 * Created by Ellery1 on 15/8/3.
 */
import _ from 'underscore';

export function validateGroupName(groupName, groupList) {

    var result = groupName && !groupList[groupName],
        ERROR_MESSAGE = '请输入合法的组名!';

    return {
        result: result,
        message: result ? null : ERROR_MESSAGE
    };
}

//验证当前新增的规则是否合法
export function validateDomain(domain, index, ruleList) {

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

    for (let i = 0; i < currentDomainArr.length; i++) {

        let subDomain = currentDomainArr[i];

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

                let subD = currentDomainArr[j];

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
        }
    }

    for (var i = 0; i < ruleList.length; i++) {

        var rule = ruleList[i],
            domain = rule.domain,
            ip = rule.ip;

        if (_.where(ruleList, {domain: domain}).length > 1) {

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
            responder && !_.findWhere(patterList, {pattern: pattern});

    return {
        result: result,
        message: ERROR_MESSAGE
    }
}

export function validateServerConfig(serverConfig) {

    var ERROR_MESSAGE = "非法的JSON字符串,请检查.";

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

export function exportHostList(ruleList, serverInfo) {

    return ruleList && ruleList.length ? ruleList.reduce(function (result, rule) {

        var domainArr = rule.domain.replace(/[\n\r\s]+/, ' ').split(/\s+/),
            current = rule.current,
            isOnline = current === 'online',
            cache = rule.cache,
            selectedServerIndex = cache[current],
            ip = current === 'custom' ?
                cache.custom :
                serverInfo[current][selectedServerIndex];

        if (!isOnline) {

            result = result.concat(domainArr.map(domain=>ip + ' ' + domain));
        }

        return result;
    }, []).join('\n') : '';
}

export function getServerByIp(ip, serverInfo) {

    var rshortcut = /(.+)\-(\d+)/,
        mshortcut = ip.match(rshortcut);

    if (mshortcut && mshortcut.length) {

        let insertGroupName = mshortcut[1],
            insertIpIndex = mshortcut[2],
            targetGroup = serverInfo[insertGroupName];

        if (targetGroup !== undefined) {

            if (Object.keys(targetGroup).some(serverIndex=>serverIndex === insertIpIndex)) {

                return {
                    groupName: insertGroupName,
                    ipIndex: insertIpIndex
                };
            }
        }
    }

    var groupInfo;

    for (let groupName in serverInfo) {

        if (serverInfo.hasOwnProperty(groupName)) {

            groupInfo = serverInfo[groupName];

            for (let ipIndex in groupInfo) {

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

export function formatRuleList(ruleListStr, serverInfo, existedRuleList) {

    var ruleListRaw = ruleListStr.replace(/\#.*([\n\r]|$)/g,'\n').split(/[\n\r]+/),
        ruleList = ruleListRaw.reduce((acc, ruleStr)=> {

            var ruleArr = ruleStr.trim().split(/\s+/),
                ip = ruleArr.shift(),
                domain = ruleArr.join(' ');

            if (ip && domain) {

                acc.push({
                    ip: ip,
                    domain: domain
                });
            }

            return acc;
        }, []);

    var validated = validateMultiDomain(ruleList, existedRuleList);

    if (!validated.result) {

        alert(validated.message);
        return null;
    }

    return ruleList.map((rule)=> {

        var targetServer = getServerByIp(rule.ip, serverInfo),
            domain = rule.domain,
            generatedRule = {
                domain: domain,
                current: targetServer.groupName,
                cache: {}
            };

        generatedRule.cache[targetServer.groupName] = targetServer.ipIndex;

        return generatedRule;
    });
};