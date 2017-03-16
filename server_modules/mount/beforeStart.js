module.exports = function () {
    var fs = require('fs'),
        CONST = require('../constant'),
        configPath = CONST.QP_PATH,
        blockConfigPath = CONST.QB_PATH,
        serverConfigPath = CONST.QS_PATH,
        defaultConfig = require('../../defaultConfig/defaultConfig.json'),
        defaultServer = require('../../defaultConfig/defaultServer.json'),
        privateKeyPath = CONST.SERVER_KEY,
        certificatePath = CONST.SERVER_CRT,
        key = require('../../defaultConfig/serverkey.js'),
        crt = require('../../defaultConfig/servercrt.js');

    function createFileIfNotExists(path, content, msg, stringify) {
        if (!fs.existsSync(path)) {
            fs.writeFileSync(path, stringify ? JSON.stringify(content) : content);
            fs.chmodSync(path, '777');
            console.log(msg);
        }
    }

    var sampleBlockList = [
    ];

    createFileIfNotExists(blockConfigPath, {list: sampleBlockList}, "断点配置文件已更新,你可以在~/.qpconfig中手动编辑", true);
    createFileIfNotExists(configPath, defaultConfig, "用户配置文件已更新,你可以在~/.qpconfig中手动编辑", true);
    createFileIfNotExists(serverConfigPath, defaultServer, "服务器配置文件已更新,你可以在~/.qsconfig中手动编辑", true);
    createFileIfNotExists(privateKeyPath, key, "key已创建在~/server.key");
    createFileIfNotExists(certificatePath, crt, "certificate已创建在~/server.crt");
};