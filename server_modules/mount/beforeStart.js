module.exports = function () {

    var fs = require('fs'),
        Path = require('path'),
        HOME = process.env.HOME,
        configPath = Path.resolve(HOME, ".qpconfig"),
        blockConfigPath = Path.resolve(HOME, ".qbconfig"),
        serverConfigPath = Path.resolve(HOME, '.qsconfig'),
        defaultConfig = require('../../defaultConfig/defaultConfig.json'),
        defaultServer = require('../../defaultConfig/defaultServer.json'),
        privateKeyPath = Path.resolve(HOME, 'server.key'),
        certificatePath = Path.resolve(HOME, 'server.crt'),
        caPath = Path.resolve(HOME, 'ca.pem'),
        key = require('../../defaultConfig/serverkey.js'),
        crt = require('../../defaultConfig/servercrt.js'),
        ca = require('../../defaultConfig/ca.js'),
        _ = require('underscore'),
        execSync = require('child_process').execSync;

    function createFileIfNotExists(path, content, msg, stringify) {

        if (!fs.existsSync(path)) {

            fs.writeFileSync(path, stringify ? JSON.stringify(content) : content);
            fs.chmodSync(path, '777');

            console.log(msg);
        }
    }

    var sampleBlockList = [
        {
            regex: "tips\.qunar\.com",
            isOn: true
        }
    ];

    createFileIfNotExists(blockConfigPath, {list: sampleBlockList}, "断点配置文件已更新,你可以在~/.qpconfig中手动编辑", true);
    createFileIfNotExists(configPath, defaultConfig, "用户配置文件已更新,你可以在~/.qpconfig中手动编辑", true);
    createFileIfNotExists(serverConfigPath, defaultServer, "服务器配置文件已更新,你可以在~/.qsconfig中手动编辑", true);
    createFileIfNotExists(privateKeyPath, key, "key已创建在~/server.key");
    createFileIfNotExists(certificatePath, crt, "certificate已创建在~/server.crt");
    createFileIfNotExists(caPath, ca, 'CA证书已创建在~/ca.pem');
};