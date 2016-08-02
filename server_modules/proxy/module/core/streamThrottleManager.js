/**
 * Created by Ellery1 on 16/8/1.
 */
var service = require('../../../service');

function Stream(readStream, writeStream, lag) {

    this.init(readStream, writeStream, lag);
}

Stream.prototype = {
    init: function (readStream, writeStream, lag) {

        var self = this;

        this.readStream = readStream;
        this.writeStream = writeStream;
        this.bufferSize = 0;
        this.buffer = null;
        this.bufferList = [];
        this.currentOffset = 0;
        this.lag = lag;

        this.readStream
            .on('data', function (chunk) {

                self.bufferList.push(chunk);
                self.bufferSize += chunk.length;
            })
            .on('end', function () {

                setTimeout(function () {

                    self.buffer = Buffer.concat(self.bufferList, self.bufferSize);
                }, self.lag);
            });
    },
    step: function (speed) {

        if (this.buffer) {

            var bufferLen = this.buffer.length;

            if (bufferLen) {

                var start = this.currentOffset,
                    end = this.currentOffset + speed;

                end = end >= bufferLen ? bufferLen : end;

                var buf = this.buffer.slice(start, end);

                if (end === bufferLen) {

                    this.writeStream.end(buf);
                    return true;
                }
                else {

                    this.writeStream.write(buf);
                    this.currentOffset += end - start;
                    return false;
                }
            }

            this.writeStream.end();
            return true;
        }
    }
};

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

        var self = this;

        self.connectionPool.push(
            new Stream(
                readStream,
                writeStream,
                StreamThrottleManager.LAG_MAP[this.throttleLevel]
            )
        );
    },
    removeStream: function (connection) {

        var index = this.connectionPool.indexOf(connection);

        if (index !== -1) {

            this.connectionPool.splice(index, 1);
        }
    },
    pipe: function (readStream, writeStream, host) {

        var config = service.getConfig(),
            throttleLevel = config.throttleLevel;

        if (!throttleLevel || !host || host.search('127.0.0.1') !== -1 || host.search('localhost') !== -1) {

            readStream.pipe(writeStream);
        }
        else {

            this.setThrottleLevel(throttleLevel)
                .createThrottling(readStream, writeStream);
        }
    }
};

module.exports = new StreamThrottleManager();