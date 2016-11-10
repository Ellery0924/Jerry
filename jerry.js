require('colors');
require('babel-polyfill');

var cluster = require('cluster'),
    startQProxy = require('./server_modules/mount/start.js');

module.exports = function(){
    if (cluster.isMaster) {
        var worker = cluster.fork(),
            MAX_COUNT = 3,
            count = 0;

        cluster.on('exit', function () {
            if (++count < MAX_COUNT) {
                console.log('[WARN]'['yellow'] + ':jerry出现异常,重启进程');
                worker = cluster.fork();
            } else {
                console.log('异常次数已达' + MAX_COUNT + '次,退出进程.');
                process.exit(1);
            }
        });

        worker.on('message', function (code) {
            if (code === 'exit') {
                process.exit(1);
            }
        });
    } else {
        startQProxy();
    }
};
