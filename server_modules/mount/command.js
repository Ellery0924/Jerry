/**
 * Created by Ellery1 on 15/9/30.
 */
require('./beforeStart')();

var fs = require('fs'),
    spawn = require('child_process').spawn,
    os = require('os'),
    execSync = require('child_process').execSync,
    Path = require('path'),
    logServer = require('../logServer').wsServer;

var HOME = process.env.HOME,
    qpconfigPath = Path.resolve(HOME, '.qpconfig');

var app = require('../web/app'),
    qproxy = require('../proxy'),
    setConfig = require('../service').setConfig,
    qpconfig = JSON.parse(fs.readFileSync(qpconfigPath)),
    qport = qpconfig.qport || 999,
    aport = qpconfig.aport || 1000,
    fekitConfigPath,
    fekitArgs,
    workPath;

function start(callback) {

    app.listen(aport);
    logServer.listen(3000);
    app.on('error', function (e) {

        if (e.code === 'EADDRINUSE') {

            console.log("[ERROR]"['red'] + ": 端口 " + qport + " 已经被占用, 请关闭占用该端口的程序或者使用其它端口.");
        }
        if (e.code === 'EACCES') {

            console.log("[ERROR]: 权限不足, 请使用sudo执行."['red']);
            process.send('exit');
        }

        return process.exit(1);
    });

    app.on('listening', function () {

        console.log('jerryproxy已经启动,端口为 ' + qport + '...');
        console.log('按CTRL+C退出');
        callback && callback();
        qproxy.server.listen(qport);

        if (os.platform() !== 'win32') {

            execSync('open http://127.0.0.1:' + aport + '/qproxy');
        }
    });
}

function setRunningPort() {

    qpconfig.qport = qport = process.argv[3] || 999;
    qpconfig.aport = aport = process.argv[4] || 1000;
    setConfig(qpconfig);

    console.log('jerryproxy代理和jerryproxy界面的端口被设置为: ' + qport + ',' + aport);
    process.send('exit');
}

function startWithDevServer(serverName) {

    fekitArgs = Array.prototype.slice.call(process.argv, 3);
    workPath = fs.existsSync(qpconfig.fekitWorkPath) ? qpconfig.fekitWorkPath : process.cwd();
    fekitArgs.length &&
    console.log(serverName + ' server已启动,参数为:' + fekitArgs.join(','));
    console.log('当前' + serverName + '工作目录为: ' + workPath);

    start(function () {
        spawn(serverName, ['server'].concat(fekitArgs), {
            cwd: workPath,
            env: process.env,
            customFds: [0, 1, 2]
        });
    });
}

function setWorkPath() {

    fekitConfigPath = process.argv[3];

    if (fekitConfigPath && fs.existsSync(fekitConfigPath)) {

        qpconfig.fekitWorkPath = fekitConfigPath;
        setConfig(qpconfig);

        console.log('fekit工作目录被设置为: ' + fekitConfigPath);
    }
    else {

        console.log('fekit工作目录设置不正确,请检查是否是合法的路径');
    }

    process.send('exit');
}

module.exports = {
    setRunningPort: setRunningPort,
    startWithDevServer: startWithDevServer,
    start: start,
    setWorkPath: setWorkPath
};