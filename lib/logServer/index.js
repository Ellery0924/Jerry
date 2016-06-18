/**
 * Created by Ellery1 on 16/5/24.
 */
var Logger = require('./Logger'),
    BlockPoint = require('./BlockPoint'),
    wsServer = require('./wsServer');

setInterval(Logger.sendLog, 200);

module.exports = {
    wsServer: wsServer,
    BlockPoint: BlockPoint,
    Logger: Logger.klass
};

