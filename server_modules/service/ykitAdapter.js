/**
 * Created by Ellery1 on 16/7/27.
 */
var HOST_FILE_NAME = 'ykit.hosts',
    fs = require('fs'),
    Path = require('path'),
    formatRuleList = require('./hostUtils').formatRuleList,
    exportHostList = require('./hostUtils').exportHostList;

var rignore = /^\./,
    rykit = /\_ykit$/,
    rykitconfig = /ykit\.[\w\_\d]+\.js/;

var CWD = process.cwd();

function fetchGroupConfigFromYkitFolder(serverInfo) {

    return iterateFolder(CWD, function (acc, folder) {

        var realPath = Path.resolve(CWD, folder),
            renderedHosts = extractHostFile(Path.resolve(realPath, HOST_FILE_NAME), serverInfo);

        if (renderedHosts) {

            acc[folder + '_ykit'] = renderedHosts;
        }

        return acc;
    }, {});
}

function syncGroupConfigToYkitFolder(config, serverInfo) {

    Object.keys(config.group).forEach(function (key) {

        var setting = config.group[key];

        writeSettingToYkitHosts(key, setting, serverInfo);
    });
}

function writeSettingToYkitHosts(groupname, setting, serverInfo) {

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

        return fs.statSync(item).isDirectory()
            && !rignore.test(item)
            && isYKitFolder(Path.resolve(CWD, item));
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

module.exports = {
    fetchGroupConfig: fetchGroupConfigFromYkitFolder,
    syncGroupConfig: syncGroupConfigToYkitFolder,
    rykit: rykit
};