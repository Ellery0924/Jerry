/**
 * Created by Ellery1 on 15/7/30.
 */
var fs = require('fs'),
    CONST = require('../constant'),
    configPath = CONST.QP_PATH,
    serverConfigPath = CONST.QS_PATH,
    blockPointSettingPath = CONST.QB_PATH,
    ykitAdapter = require('./ykitAdapter');

var currentConfig = null,
    currentServerInfo = null,
    currentBlockPointSetting = null;

function checkActivatedGroupExist(config) {

    var groupConfig = config.group,
        activatedGroupExist = Object.keys(groupConfig).some(function (key) {
            return key === config.activated;
        });

    if (!activatedGroupExist) {

        config.activated = 'default';
    }

    return config;
}

function getConfig() {

    if (!currentConfig) {

        var ret = JSON.parse(fs.readFileSync(configPath));
        ret.group = Object.assign({}, ret.group, ykitAdapter.fetchGroupConfig(getServerInfo()));
        currentConfig = checkActivatedGroupExist(ret);
    }

    return currentConfig;
}

function getServerInfo() {

    if (!currentServerInfo) {

        currentServerInfo = JSON.parse(fs.readFileSync(serverConfigPath));
    }

    return currentServerInfo;
}

function setConfig(config) {

    ykitAdapter.syncGroupConfig(config, getServerInfo());

    Object.keys(config.group).forEach(function (key) {

        if (ykitAdapter.rykit.test(key)) {

            delete config.group[key];
        }
    });

    currentConfig = config;

    fs.writeFile(configPath, JSON.stringify(config).trim(), function (err) {

        if (err) {

            throw err;
        }

        console.log('~/.qpconfig updated.');
    });
}

function setServerInfo(serverInfo) {

    fs.writeFile(serverConfigPath, JSON.stringify(serverInfo).trim(), function (err) {

        if (err) {

            throw err;
        }

        console.log('~/.qsconfig updated.');
    });

    currentServerInfo = serverInfo;
}

function getBlockPointSetting() {

    if (!currentBlockPointSetting) {

        currentBlockPointSetting = JSON.parse(fs.readFileSync(blockPointSettingPath));
    }

    return currentBlockPointSetting;
}

function setBlockPointSetting(setting) {

    fs.writeFile(blockPointSettingPath, JSON.stringify({list: setting}).trim(), function (err) {

        if (err) {

            throw err;
        }

        console.log('~/.qbconfig updated.');
    });

    currentBlockPointSetting = setting;
}

module.exports = {
    getConfig: getConfig,
    setConfig: setConfig,
    getServerInfo: getServerInfo,
    setServerInfo: setServerInfo,
    getBlockPointSetting: getBlockPointSetting,
    setBlockPointSetting: setBlockPointSetting
};
