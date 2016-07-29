function exportHostList(ruleList, serverInfo) {

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

            result = result.concat(domainArr.map(function (domain) {
                return ip + ' ' + domain
            }));
        }

        return result;
    }, []).join('\n') : '';
}

function getServerByIp(ip, serverInfo) {

    var rshortcut = /(.+)\-(\d+)/,
        mshortcut = ip.match(rshortcut);

    if (mshortcut && mshortcut.length) {

        var insertGroupName = mshortcut[1],
            insertIpIndex = mshortcut[2],
            targetGroup = serverInfo[insertGroupName];

        if (targetGroup !== undefined) {

            if (Object.keys(targetGroup).some(function (serverIndex) {
                    return serverIndex === insertIpIndex
                })) {

                return {
                    groupName: insertGroupName,
                    ipIndex: insertIpIndex
                };
            }
        }
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

function formatRuleList(ruleListStr, serverInfo) {

    var ruleListRaw = ruleListStr.replace(/\#.*([\n\r]|$)/g, '\n').split(/[\n\r]+/),
        ruleList = ruleListRaw.reduce(function (acc, ruleStr) {

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

    return ruleList.map(function (rule) {

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
}

module.exports = {
    formatRuleList: formatRuleList,
    exportHostList: exportHostList
};
