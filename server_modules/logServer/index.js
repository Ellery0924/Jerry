/**
 * Created by Ellery1 on 16/5/24.
 */
var Logger = require('./Logger'),
    wsServer = require('./wsServer');

Logger.init();

module.exports = {
    wsServer: wsServer,
    Logger: Logger.klass
};

