var config = require('../service').getConfig();
var socketPort = config.logServerPort;

module.exports = [
    "127.0.0.1:" + socketPort,
    "localhost:" + socketPort,
    "baidu.com",
    "google.com",
    "gstatic.com"
];