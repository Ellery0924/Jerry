/**
 * Created by Ellery1 on 15/7/30.
 */
var fs = require('fs'),
    HOME = process.env.HOME,
    configPath = HOME + "/.qpconfig",
    serverConfigPath = HOME + '/.qsconfig',
    blockPointSettingPath = HOME + '/.qbconfig',
    _ = require('underscore');

function getConfig() {

    return JSON.parse(fs.readFileSync(configPath));
}

function getServerInfo() {

    return JSON.parse(fs.readFileSync(serverConfigPath));
}

function setConfig(config) {

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

    fs.writeFile(setting, JSON.stringify(setting).trim(), function (err) {

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
