/**
 * Created by Ellery1 on 15/9/22.
 */
var command = require('./command.js');

module.exports = function () {

    var commandStr = process.argv[2] || '';

    switch (commandStr) {

        case '-p':
            command.setRunningPort();
            break;

        case '-f':
            command.startWithFekit();
            break;

        case '-s':
            command.setFekitWorkPath();
            break;

        default:
            command.start(null);
    }
};