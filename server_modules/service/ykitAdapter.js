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

function fetchGroupConfigFromYkitFolder(serverInfo) {

    var ret = {};

    iterateFolder(process.cwd(), function (folder) {

        var realPath = Path.resolve(process.cwd(), folder),
            renderedHosts = extractHostFile(Path.resolve(realPath, HOST_FILE_NAME), serverInfo);

        if (renderedHosts) {

            ret[folder + '_ykit'] = renderedHosts;
        }
    });

    return ret;
}

function syncGroupConfigToYkitFolder(config, serverInfo) {

    Object.keys(config.group).forEach(function (key) {

        var setting = config.group[key];

        writeSettingToYkitHosts(key, setting, serverInfo);
    });
}

function writeSettingToYkitHosts(groupname, setting, serverInfo) {

    if (rykit.test(groupname)) {

        var folderPath = Path.resolve(process.cwd(), groupname.replace(/\_ykit$/, '')),
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

function iterateFolder(path, operate) {

    var folders = fs.readdirSync(path).filter(function (item) {

        return fs.statSync(item).isDirectory()
            && !rignore.test(item)
            && isYKitFolder(Path.resolve(process.cwd(), item));
    });

    folders.forEach(function (folder) {

        operate(folder);
    });
}

function extractHostFile(filepath, serverInfo) {

    if (fs.existsSync(filepath)) {

        return formatRuleList(fs.readFileSync(filepath, 'utf8'), serverInfo);
    }

    return [];
}

module.exports = {
    fetchGroupConfig: fetchGroupConfigFromYkitFolder,
    syncGroupConfig: syncGroupConfigToYkitFolder
};