/**
 * Created by Ellery1 on 16/7/29.
 */
var Path = require('path');

var HOME = process.env.HOME || process.env.APPDATA,
    QB_PATH = Path.resolve(HOME, '.qbconfig'),
    QS_PATH = Path.resolve(HOME, '.qsconfig'),
    QP_PATH = Path.resolve(HOME, '.qpconfig'),
    SERVER_CRT = Path.resolve(HOME, 'server.crt'),
    SERVER_KEY = Path.resolve(HOME, 'server.key');

module.exports = {
    HOME: HOME,
    QB_PATH: QB_PATH,
    QS_PATH: QS_PATH,
    QP_PATH: QP_PATH,
    SERVER_CRT: SERVER_CRT,
    SERVER_KEY: SERVER_KEY
};