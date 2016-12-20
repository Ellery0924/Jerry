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
                } else {
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

module.exports = Stream;