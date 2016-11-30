var config = require('../service').getConfig();
var socketPort = config.logServerPort;
var webappPort = config.aport;

module.exports = [
    "127.0.0.1:" + socketPort,
    "localhost:" + socketPort,
    "baidu.com",
    "google.com",
    "gstatic.com"
];