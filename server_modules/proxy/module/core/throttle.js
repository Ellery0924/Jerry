/**
 * Created by Ellery1 on 16/8/1.
 */
function Connection(readStream, writeStream) {

    this.initConnection(readStream, writeStream);
}

Connection.prototype = {
    initConnection: function (readStream, writeStream, lagency) {

        var self = this;

        this.readStream = readStream;
        this.writeStream = writeStream;
        this.bufferSize = 0;
        this.buffer = null;
        this.bufferList = [];
        this.currentOffset = 0;
        this.lagency = lagency;

        this.readStream
            .on('data', function (chunk) {

                self.bufferList.push(chunk);
                self.bufferSize += chunk.length;
            })
            .on('end', function () {

                setTimeout(function () {

                    self.buffer = Buffer.concat(self.bufferList, self.bufferSize);
                }, self.lagency);
            });
    },
    step(speed){

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

function ConnectionManager() {

    this.connectionPool = [];
    this.setThrottleLevel('2G');
}

ConnectionManager.FRAME_LENGTH = 32;
Connection.FRAME_TIME = Math.floor(1000 / 32);
ConnectionManager.LAGENCY_MAP = {
    "4G": 20,
    "3G": 200,
    "2G": 300,
    "GPRS": 500
};
ConnectionManager.BANDWIDTH_MAP = {
    "4G": 1024 * 1024 / ConnectionManager.FRAME_LENGTH,
    "3G": 100 * 1024 / ConnectionManager.FRAME_LENGTH,
    "2G": 15 * 1024 / ConnectionManager.FRAME_LENGTH,
    "GPRS": 1024 / ConnectionManager.FRAME_LENGTH
};

ConnectionManager.prototype = {
    setThrottleLevel: function (throttleLevel) {

        this.throttleLevel = throttleLevel;
        this.bandWidth = this.getBandWidth(throttleLevel);
    },
    getBandWidth(throttleLevel){

        return ConnectionManager.BANDWIDTH_MAP[throttleLevel];
    },
    getSpeed(){

        return this.bandWidth / this.connectionPool.length;
    },
    init(){

        var self = this;

        setInterval(function () {

            var speed = self.getSpeed();

            self.connectionPool.forEach(function (connection) {

                if (connection.step(speed)) {

                    self.removeConnection(connection);
                }
            });
        }, ConnectionManager.FRAME_TIME);

        return this;
    },
    createConnection(readStream, writeStream){

        var self = this;

        self.connectionPool.push(
            new Connection(
                readStream,
                writeStream,
                ConnectionManager.LAGENCY_MAP[this.throttleLevel]
            )
        );
    },
    removeConnection(connection){

        var index = this.connectionPool.indexOf(connection);

        if (index !== -1) {

            this.connectionPool.splice(index, 1);
        }
    }
};

module.exports = new ConnectionManager().init();