/**
 * Created by Ellery1 on 15/9/30.
 */
require('./beforeStart')();

var fs = require('fs'),
    spawn = require('child_process').spawn,
    logServer = require('../logServer').wsServer,
    service = require('../service');

var app = require('../web/app'),
    qproxy = require('../proxy'),
    setConfig = service.setConfig,
    qpconfig = service.getConfig(),
    qport = qpconfig.qport || 999,
    aport = qpconfig.aport || 1000,
    httpsPort = qpconfig.httpsPort || 1001,
    logServerPort = qpconfig.logServerPort || 3000,
    fekitConfigPath,
    fekitArgs,
    workPath;

function start(callback) {
    app.listen(aport);
    logServer.listen(logServerPort);
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
        console.log('[JerryProxy] '.grey + 'Starting up proxy...');
        console.log('[JerryProxy] '.grey + 'Please set proxy server to 127.0.0.1:' + qport);
        console.log('[JerryProxy] '.grey + 'Available on: ' + 'http://127.0.0.1:1000/jerry'.underline);
        callback && callback();
        qproxy.server.listen(qport, httpsPort);
    });
}

function setRunningPort() {
    qpconfig.qport = qport = process.argv[3] || 999;
    qpconfig.aport = aport = process.argv[4] || 1000;
    qpconfig.httpsPort = httpsPort = process.argv[5] || 1001;
    qpconfig.logServerPort = logServerPort = process.argv[6] || 3000;
    setConfig(qpconfig);

    console.log('http代理端口被设置为:' + qport);
    console.log('界面服务器端口被设置为:' + aport);
    console.log('https中间人服务器端口被设置为' + httpsPort);
    console.log('日志服务器端口被设置为:' + logServerPort);
    process.send('exit');
}

function startWithDevServer(serverName) {
    fekitArgs = Array.prototype.slice.call(process.argv, 3);
    workPath = fs.existsSync(qpconfig.fekitWorkPath) ? qpconfig.fekitWorkPath : process.cwd();

    if (fekitArgs) {
        console.log(serverName + ' server已启动,参数为:' + fekitArgs.join(','));
    }

    console.log('当前' + serverName + '工作目录为: ' + workPath);

    start(function () {
        spawn(serverName, ['server'].concat(fekitArgs), {
            cwd: workPath,
            env: process.env,
            stdio: [0, 1, 2]
        });
    });
}

function setWorkPath() {
    fekitConfigPath = process.argv[3];

    if (fekitConfigPath && fs.existsSync(fekitConfigPath)) {
        qpconfig.fekitWorkPath = fekitConfigPath;
        setConfig(qpconfig);
        console.log('fekit工作目录被设置为: ' + fekitConfigPath);
    } else {
        console.log('fekit工作目录设置不正确,请检查是否是合法的路径');
    }

    process.send('exit');
}

function setWebSocketConfig() {
    var wsPort = process.argv[3];

    if (wsPort != null) {
        qpconfig.wsPort = wsPort;
        setConfig(qpconfig);
        console.log('websocket端口被设置为: ' + wsPort);
    } else {
        console.log('websocket端口不能为空，请检查。');
    }

    process.send('exit');
}

module.exports = {
    setRunningPort: setRunningPort,
    startWithDevServer: startWithDevServer,
    start: start,
    setWorkPath: setWorkPath,
    setWebSocketConfig: setWebSocketConfig
};
