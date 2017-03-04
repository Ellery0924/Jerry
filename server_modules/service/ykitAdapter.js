/**
 * Created by Ellery1 on 16/7/27.
 */
var requireUncached = require('require-uncached');

var HOST_FILE_NAME = 'ykit.hosts',
    MOCK_FILE_NAME = 'mock.js',
    fs = require('fs'),
    Path = require('path');

var rignore = /^\./,
    rykit = /\_ykit$/,
    rykitconfig = /ykit(?:\.[\w\_\d]+)?\.js/;

function exportHostList(ruleList, serverInfo, shouldNotShowOnlineHosts) {
    return ruleList && ruleList.length ? ruleList.reduce(function (result, rule) {
            var domainArr = rule.domain.replace(/[\n\r\s]+/, ' ').split(/\s+/),
                current = rule.current,
                isOnline = current === 'online',
                cache = rule.cache,
                selectedServerIndex = cache[current],
                ip = current === 'custom' ?
                    cache.custom :
                    serverInfo[current][selectedServerIndex];

            if (shouldNotShowOnlineHosts) {
                if (!isOnline) {
                    result = result.concat(ip + ' ' + domainArr.join(' '));
                }
            } else {
                result = result.concat((isOnline ? 'online' : ip) + ' ' + domainArr.join(' '));
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

    return ip !== 'online' ? {
            groupName: 'custom',
            ipIndex: ip
        } : {
            groupName: 'online'
        };
}

function formatRuleListGenerator(validator) {
    return function (ruleListStr, serverInfo, existedRuleList) {
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

        if (validator) {
            var validated = validator(ruleList, existedRuleList);
            if (!validated.result) {
                alert(validated.message);
                return null;
            }
        }

        return ruleList.map(function (rule) {
            var targetServer = getServerByIp(rule.ip, serverInfo),
                domain = rule.domain,
                generatedRule = {
                    domain: domain,
                    current: targetServer.groupName,
                    cache: {}
                };

            if (targetServer.groupName !== 'online') {
                generatedRule.cache[targetServer.groupName] = targetServer.ipIndex;
            }

            return generatedRule;
        });
    }
}

function fetchGroupConfigFromYkitFolder(serverInfo, CWD) {
    return iterateFolder(CWD, function (acc, folder) {
        var realPath = Path.resolve(CWD, folder),
            renderedHosts = extractHostFile(Path.resolve(realPath, HOST_FILE_NAME), serverInfo);

        if (renderedHosts) {
            acc[folder + '_ykit'] = renderedHosts;
        }

        return acc;
    }, {});
}

function syncGroupConfigToYkitFolder(config, CWD) {
    Object.keys(config.group).forEach(function (key) {
        var setting = config.group[key];
        writeSettingToYkitHosts(key, setting, CWD);
    });
}

function writeSettingToYkitHosts(groupname, setting, CWD) {
    if (rykit.test(groupname)) {
        var folderPath = Path.resolve(CWD, groupname.replace(/\_ykit$/, '')),
            hostsPath = Path.resolve(folderPath, 'ykit.hosts');

        try {
            if (fs.existsSync(folderPath) && isYKitFolder(folderPath)) {
                fs.writeFileSync(hostsPath, JSON.stringify(setting, null, 4), 'utf8');
                fs.chmodSync(hostsPath, '777');
            }
        }
        catch (e) {
            console.log(e.stack);
        }
    }
}

function isYKitFolder(folderPath) {
    return fs.existsSync(folderPath) && fs.readdirSync(folderPath).some(function (path) {
            return rykitconfig.test(path) && fs.statSync(Path.resolve(folderPath, path)).isFile();
        });
}

function iterateFolder(path, operate, acc) {
    var folders = fs.readdirSync(path).filter(function (item) {

        return fs.statSync(Path.resolve(path, item)).isDirectory()
            && !rignore.test(item)
            && isYKitFolder(Path.resolve(path, item));
    });

    return folders.reduce(function (acc, folder) {
        return operate(acc, folder);
    }, acc);
}

function extractHostFile(filepath, serverInfo) {
    if (fs.existsSync(filepath)) {
        try {
            return JSON.parse(fs.readFileSync(filepath, 'utf8'));
        } catch (e) {
            return formatRuleList(fs.readFileSync(filepath, 'utf8'), serverInfo);
        }
    }

    return [];
}

function fetchMockConfig(CWD, projectName) {
    var folderName = projectName.replace(/\_ykit$/, ''),
        mockConfigFilePath = Path.resolve(CWD, folderName, MOCK_FILE_NAME),
        backupConfigPath = Path.resolve(CWD, folderName, 'mock.js');

    if (fs.existsSync(mockConfigFilePath)) {
        return {
            projectPath: Path.resolve(CWD, folderName),
            mockConfig: requireUncached(mockConfigFilePath)
        };
    } else if (fs.existsSync(backupConfigPath)) {
        return {
            projectPath: Path.resolve(CWD, folderName),
            mockConfig: requireUncached(backupConfigPath)
        };
    } else {
        return null;
    }
}

module.exports = {
    fetchGroupConfig: fetchGroupConfigFromYkitFolder,
    syncGroupConfig: syncGroupConfigToYkitFolder,
    fetchMockConfig: fetchMockConfig,
    rykit: rykit
};