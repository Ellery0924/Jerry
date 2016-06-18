/**
 * Created by Ellery1 on 16/5/24.
 */
var Logger = require('./Logger'),
    wsServer = require('./wsServer');

setInterval(Logger.sendLog, 200);

module.exports = {
    wsServer: wsServer,
    Logger: Logger.klass
};

