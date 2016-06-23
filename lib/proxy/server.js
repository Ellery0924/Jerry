var http = require('http'),
    https = require('https'),
    fs = require('fs'),
    mwHttp = require('./middleman/httpMiddleMan.js'),
    mwHttps = require('./middleman/httpsMiddleMan.js');

var HOME = process.env.HOME,
    KEY_FILE_PATH = HOME + '/server.key',
    CRT_FILE_PATH = HOME + '/server.crt',
    CA_FILE_PATH = HOME + '/ca.pem';

var httpsTunnel = require('./middleman/tunnel');

module.exports = {
    listen: function (port) {

        http
            .createServer(mwHttp)
            .listen(port)
            .on('connect', httpsTunnel);

        https
            .createServer({
                key: fs.readFileSync(KEY_FILE_PATH),
                cert: fs.readFileSync(CRT_FILE_PATH),
                ca: [fs.readFileSync(CA_FILE_PATH)]
            }, mwHttps)
            .listen(1001);
    }
};