/**
 * Created by Ellery1 on 15/7/30.
 */
var fs = require('fs'),
    HOME = process.env.HOME,
    configPath = HOME + "/.qpconfig",
    serverConfigPath = HOME + '/.qsconfig',
    _ = require('underscore');

module.exports = (function () {

    var getConfig = function () {

        return JSON.parse(fs.readFileSync(configPath));
    };

    var getServerInfo = function () {

        return JSON.parse(fs.readFileSync(serverConfigPath));
    };

    var setConfig = function (config) {

        fs.writeFile(configPath, JSON.stringify(config).trim(), function (err) {

            if (err) {

                throw err;
            }

            console.log('~/.qpconfig updated.');
        });
    };

    var setServerInfo = function (serverInfo) {

        fs.writeFile(serverConfigPath, JSON.stringify(serverInfo).trim(), function (err) {

            if (err) {

                throw err;
            }

            console.log('~/.qsconfig updated.');
        });
    };

    return {
        getConfig: getConfig,
        setConfig: setConfig,
        getServerInfo: getServerInfo,
        setServerInfo: setServerInfo
    }
})();