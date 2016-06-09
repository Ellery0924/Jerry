/**
 * Created by Ellery1 on 15/9/22.
 */
var command = require('./command.js');
var fs = require('fs'),
    HOME = process.env.HOME,
    configPath = HOME + "/.qpconfig",
    serverConfigPath = HOME + '/.qsconfig',
    defaultConfig = require('../defaultConfig/defaultConfig.json'),
    defaultServer = require('../defaultConfig/defaultServer.json'),
    privateKeyPath = HOME + '/server.key',
    certificatePath = HOME + '/server.crt',
    key = require('../defaultConfig/serverkey.js'),
    crt = require('../defaultConfig/servercrt.js'),
    _ = require('underscore'),
    execSync = require('child_process').execSync;

var _createFileIfNotExists = function (path, content, msg, stringify) {

    if (!fs.existsSync(path)) {

        execSync('touch ' + path);
        execSync('chmod 777 ' + path);
        fs.writeFileSync(path, stringify ? JSON.stringify(content) : content);

        console.log(msg);
    }
};

_createFileIfNotExists(configPath, defaultConfig, "用户配置文件已更新,你可以在~/.qpconfig中手动编辑", true);
_createFileIfNotExists(serverConfigPath, defaultServer, "服务器配置文件已更新,你可以在~/.qsconfig中手动编辑", true);
_createFileIfNotExists(privateKeyPath, key, "key已创建在~/server.key");
_createFileIfNotExists(certificatePath, crt, "certificate已创建在~/server.crt");

module.exports = function (isRestart) {

    var commandStr = process.argv[2] || '';

    switch (commandStr) {

        case '-p':
            command.setRunningPort();
            break;

        case '-f':
            command.startWithFekit();
            break;

        case '-s':
            command.setFekitWorkPath();
            break;

        default:
            command.start(null);
    }
};