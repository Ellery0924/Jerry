/**
 * Created by Ellery1 on 16/7/27.
 */
var requireUncached = require('require-uncached');

var HOST_FILE_NAME = 'ykit.hosts',
    MOCK_FILE_NAME = 'ykit.mock.js',
    fs = require('fs'),
    Path = require('path'),
    formatRuleList = require('./hostUtils').formatRuleList,
    exportHostList = require('./hostUtils').exportHostList;

var rignore = /^\./,
    rykit = /\_ykit$/,
    rykitconfig = /ykit\.[\w\_\d]+\.js/;

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

function syncGroupConfigToYkitFolder(config, serverInfo, CWD) {

    Object.keys(config.group).forEach(function (key) {

        var setting = config.group[key];

        writeSettingToYkitHosts(key, setting, serverInfo, CWD);
    });
}

function writeSettingToYkitHosts(groupname, setting, serverInfo, CWD) {

    if (rykit.test(groupname)) {

        var folderPath = Path.resolve(CWD, groupname.replace(/\_ykit$/, '')),
            hostsPath = Path.resolve(folderPath, 'ykit.hosts'),
            renderedHostList = exportHostList(setting, serverInfo);

        try {

            if (fs.existsSync(folderPath) && isYKitFolder(folderPath)) {

                fs.writeFileSync(hostsPath, renderedHostList, 'utf8');
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

        return formatRuleList(fs.readFileSync(filepath, 'utf8'), serverInfo);
    }

    return [];
}

function fetchMockConfig(CWD, projectName) {

    var folderName = projectName.replace(/\_ykit$/, ''),
        mockConfigFilePath = Path.resolve(CWD, folderName, MOCK_FILE_NAME);

    if (fs.existsSync(mockConfigFilePath)) {

        return {
            projectPath: Path.resolve(CWD, folderName),
            mockConfig: requireUncached(mockConfigFilePath)
        };
    }
    else {

        return null;
    }
}

//function syncMockConfig(CWD, projectName, mockConfig) {
//
//}

module.exports = {
    fetchGroupConfig: fetchGroupConfigFromYkitFolder,
    syncGroupConfig: syncGroupConfigToYkitFolder,
    fetchMockConfig: fetchMockConfig,
    rykit: rykit
};