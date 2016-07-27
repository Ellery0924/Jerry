/**
 * Created by Ellery1 on 15/7/30.
 */
var fs = require('fs'),
    Path = require('path'),
    HOME = process.env.HOME,
    configPath = Path.resolve(HOME, '.qpconfig'),
    serverConfigPath = Path.resolve(HOME, '.qsconfig'),
    blockPointSettingPath = Path.resolve(HOME, '.qbconfig'),
    _ = require('underscore'),
    ykitAdapter = require('./ykitAdapter');

function getConfig() {

    var ret = JSON.parse(fs.readFileSync(configPath));

    ret.group = Object.assign({}, ret.group, ykitAdapter.fetchGroupConfig(getServerInfo()));

    return ret;
}

function getServerInfo() {

    return JSON.parse(fs.readFileSync(serverConfigPath));
}

function setConfig(config) {

    ykitAdapter.syncGroupConfig(config, getServerInfo());

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
}

function getBlockPointSetting() {

    return JSON.parse(fs.readFileSync(blockPointSettingPath));
}

function setBlockPointSetting(setting) {

    fs.writeFile(blockPointSettingPath, JSON.stringify({list: setting}).trim(), function (err) {

        if (err) {

            throw err;
        }

        console.log('~/.qbconfig updated.');
    });
}

module.exports = {
    getConfig: getConfig,
    setConfig: setConfig,
    getServerInfo: getServerInfo,
    setServerInfo: setServerInfo,
    getBlockPointSetting: getBlockPointSetting,
    setBlockPointSetting: setBlockPointSetting
};
