var service = require('../service'),
    Stream = require('./Stream');

function StreamThrottleManager() {
    this.connectionPool = [];
    this.init();
}

StreamThrottleManager.FRAME_LENGTH = 32;
StreamThrottleManager.FRAME_TIME = Math.floor(1000 / StreamThrottleManager.FRAME_LENGTH);
StreamThrottleManager.LAG_MAP = {
    "4G": 20,
    "3G": 200,
    "2G": 300,
    "GPRS": 500
};
StreamThrottleManager.BANDWIDTH_MAP = {
    "4G": 2 * 1024 * 1024 / (StreamThrottleManager.FRAME_LENGTH),
    "3G": 750 * 1024 / (StreamThrottleManager.FRAME_LENGTH),
    "2G": 120 * 1024 / (StreamThrottleManager.FRAME_LENGTH),
    "GPRS": 20 * 1024 / (StreamThrottleManager.FRAME_LENGTH)
};

StreamThrottleManager.prototype = {
    setThrottleLevel: function (throttleLevel) {
        this.throttleLevel = throttleLevel;
        this.bandWidth = this.getBandWidth(throttleLevel);
        return this;
    },
    getBandWidth: function (throttleLevel) {
        return StreamThrottleManager.BANDWIDTH_MAP[throttleLevel];
    },
    getSpeed: function () {
        return this.bandWidth / this.connectionPool.length;
    },
    init: function () {
        var self = this;

        setInterval(function () {
            self.connectionPool.forEach(function (connection) {
                if (connection.step(self.getSpeed())) {
                    self.removeStream(connection);
                }
            });
        }, StreamThrottleManager.FRAME_TIME);

        return this;
    },
    createThrottling: function (readStream, writeStream) {
        this.connectionPool.push(
            new Stream(
                readStream,
                writeStream,
                StreamThrottleManager.LAG_MAP[this.throttleLevel]
            )
        );
    },
    removeStream: function (stream) {
        var index = this.connectionPool.indexOf(stream);

        if (index !== -1) {
            this.connectionPool.splice(index, 1);
        }
    },
    pipe: function (readStream, writeStream, host) {
        var config = service.getConfig(),
            throttleLevel = config.throttleLevel;

        if (!throttleLevel || !host || host.search('127.0.0.1') !== -1 || host.search('localhost') !== -1) {
            readStream.pipe(writeStream);
        } else {
            this.setThrottleLevel(throttleLevel)
                .createThrottling(readStream, writeStream);
        }
    }
};

module.exports = StreamThrottleManager;