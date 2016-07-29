var http = require('http'),
    https = require('https'),
    fs = require('fs'),
    Path = require('path'),
    middleMan = require('./module/middleMan'),
    CONST = require('../constant');

var HOME = CONST.HOME,
    KEY_FILE_PATH = Path.resolve(HOME, 'server.key'),
    CRT_FILE_PATH = Path.resolve(HOME, 'server.crt'),
    CA_FILE_PATH = Path.resolve(HOME, 'ca.pem');

var tunnel = require('./module/tunnel');

module.exports = {
    listen: function (port) {

        http
            .createServer(middleMan('http'))
            .listen(port)
            .on('connect', tunnel);

        https
            .createServer({
                key: fs.readFileSync(KEY_FILE_PATH),
                cert: fs.readFileSync(CRT_FILE_PATH),
                ca: [fs.readFileSync(CA_FILE_PATH)]
            }, middleMan('https'))
            .listen(1001);
    }
};