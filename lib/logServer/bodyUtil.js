/**
 * Created by Ellery1 on 16/5/24.
 */

function unzipBody(stream) {

    var buffers = [], size = 0;
    return new Promise(function (resolve, reject) {

        stream
            .on('data', function (chunk) {

                buffers.push(chunk);
                size += chunk.length;
            })
            .on('end', function () {

                var encoding = stream.headers['content-encoding'];
                var buf = Buffer.concat(buffers, size);

                if (encoding === 'gzip') {

                    zlib.gunzip(buf, function (err, data) {

                        if (!err) {

                            resolve(data.toString());
                        }
                        else {

                            reject(err);
                        }
                    });
                }
                else if (encoding === 'deflate') {

                    zlib.inflate(buf, function (err, data) {

                        if (!err) {

                            resolve(data.toString());
                        }
                        else {

                            reject(err);
                        }
                    });
                }
                else {

                    resolve(buf.toString(encoding || 'utf-8'));
                }
            })
            .on('error', function (err) {

                reject(err);
            });
    });
}

function parseBody(body) {

    return body;
}

module.exports = {
    unzipBody: unzipBody,
    parseBody: parseBody
};