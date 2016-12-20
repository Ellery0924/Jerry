/**
 * Created by Ellery1 on 15/7/30.
 */
var fs = require('fs'),
    CONST = require('../constant'),
    configPath = CONST.QP_PATH,
    serverConfigPath = CONST.QS_PATH,
    blockPointSettingPath = CONST.QB_PATH,
    ykitAdapter = require('./ykitAdapter'),
    _ = require('lodash');

var currentConfig = null,
    currentServerInfo = null,
    currentBlockPointSetting = null;

function getWorkPath(path) {
    return fs.existsSync(path) ? path : process.cwd();
}

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

function getConfig(force) {
    if (!currentConfig || force) {
        var ret = JSON.parse(fs.readFileSync(configPath, 'utf8'));
        ret.group = Object.assign(
            {},
            ret.group,
            ykitAdapter.fetchGroupConfig(getServerInfo(), getWorkPath(ret.fekitWorkPath))
        );
        currentConfig = ret;
    }
    currentConfig = checkActivatedGroupExist(currentConfig);
    return currentConfig;
}

function getServerInfo() {
    if (!currentServerInfo) {
        currentServerInfo = JSON.parse(fs.readFileSync(serverConfigPath, 'utf8'));
    }
    return currentServerInfo;
}

function setConfig(config) {
    try {
        currentConfig = _.cloneDeep(config);
        ykitAdapter.syncGroupConfig(config, getWorkPath(config.fekitWorkPath));
        Object.keys(config.group).forEach(function (key) {
            if (ykitAdapter.rykit.test(key)) {
                delete config.group[key];
            }
        });
        fs.writeFile(configPath, JSON.stringify(config).trim(), function (err) {
            if (err) {
                throw err;
            }

            console.log('~/.qpconfig updated.');
        });
    }
    catch(e){
        console.log(e.stack)
    }
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
        currentBlockPointSetting = JSON.parse(fs.readFileSync(blockPointSettingPath, 'utf8'));
    }
    return currentBlockPointSetting;
}

function setBlockPointSetting(setting) {
    var blockSetting = {list: setting};
    fs.writeFile(blockPointSettingPath, JSON.stringify(blockSetting).trim(), function (err) {
        if (err) {
            throw err;
        }
        console.log('~/.qbconfig updated.');
    });
    currentBlockPointSetting = blockSetting;
}

function getMockConfig(projectName) {
    return ykitAdapter.fetchMockConfig(getWorkPath(currentConfig.fekitWorkPath), projectName);
}

module.exports = {
    getConfig: getConfig,
    setConfig: setConfig,
    getServerInfo: getServerInfo,
    setServerInfo: setServerInfo,
    getBlockPointSetting: getBlockPointSetting,
    setBlockPointSetting: setBlockPointSetting,
    getMockConfig: getMockConfig
};
