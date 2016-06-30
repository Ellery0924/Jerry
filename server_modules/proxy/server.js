var http = require('http'),
    https = require('https'),
    fs = require('fs'),
    middleMan = require('./middleman/middleMan');

var HOME = process.env.HOME,
    KEY_FILE_PATH = HOME + '/server.key',
    CRT_FILE_PATH = HOME + '/server.crt',
    CA_FILE_PATH = HOME + '/ca.pem';

var tunnel = require('./middleman/tunnel');

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