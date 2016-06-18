/**
 * Created by Ellery1 on 16/6/18.
 */
var io = require('socket.io'),
    app = require('express')(),
    http = require('http').createServer(app),
    wsServer = io(http);

module.exports = wsServer;