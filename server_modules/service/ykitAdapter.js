/**
 * Created by Ellery1 on 16/7/27.
 */
var requireUncached = require('require-uncached');

var HOST_FILE_NAME = 'ykit.hosts',
    MOCK_FILE_NAME = 'mock.js',
    fs = require('fs'),
    Path = require('path'),
    formatRuleList = require('./hostUtils').formatRuleList;

var rignore = /^\./,
    rykit = /\_ykit$/,
    rykitconfig = /ykit(?:\.[\w\_\d]+)?\.js/;

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