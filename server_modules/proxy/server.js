var http = require('http'),
    https = require('https'),
    fs = require('fs'),
    middleMan = require('./module/middleMan'),
    tunnel = require('./module/tunnel'),
    CONST = require('../constant');

var KEY_FILE_PATH = CONST.SERVER_KEY,
    CRT_FILE_PATH = CONST.SERVER_CRT;

module.exports = {
    listen: function (port) {

        http
            .createServer(middleMan('http'))
            .listen(port)
            .on('connect', tunnel);

        https
            .createServer({
                key: fs.readFileSync(KEY_FILE_PATH),
                cert: fs.readFileSync(CRT_FILE_PATH)
            }, middleMan('https'))
            .listen(1001);
    }
};