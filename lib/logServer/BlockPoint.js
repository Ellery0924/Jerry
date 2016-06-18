/**
 * Created by Ellery1 on 16/6/18.
 */
var service = require('../service'),
    wsServer = require('./wsServer'),
    URL = require('url'),
    unzipBody = require('./bodyUtil').unzipBody,
    parseBody = require('./bodyUtil').parseBody,
    queryToObj = require('./bodyUtil').queryToObj,
    blockPointSetting = service.getBlockPointSetting();

function BlockPoint() {
    this.req = null;
    this.blocked = false;
}

BlockPoint.prototype = {
    checkShouldBeBlocked(req){

        var blList = blockPointSetting.list,
            validList = blList.filter(function (singleSetting) {
                return singleSetting.isOn;
            }),
            contains = validList.some(function (singleSetting) {
                return singleSetting.regex.test(req.url);
            });

        if (contains) {

            this.req = req;
            this.blocked = true;
            return true;
        }
        else {

            return false;
        }
    },
    sendRequestLog(){

        var req = this.req;

        if (this.blocked) {

            unzipBody(req)
                .then(function (ret) {

                    var parsedUrl = req.url ? URL.parse(req.url) : "",
                        parsedQuery = {},
                        body = parseBody(ret);

                    if (parsedUrl.query) {

                        parsedQuery = queryToObj(parsedUrl.query);
                    }

                    wsServer.sockets.emit('blockpoint', {
                        type: 'request',
                        request: {
                            headers: req.headers,
                            body: body.json,
                            raw: body.raw,
                            query: parsedQuery
                        },
                        method: req.method,
                        url: req.url,
                        time: new Date().toString(),
                        parsedUrl: parsedUrl
                    });
                });
        }
    },
    sendResponseLog(res){

        if (this.blocked) {

            unzipBody(res)
                .then(function (ret) {

                    var body = parseBody(ret);

                    wsServer.sockets.emit('blockpoint', {
                        type: 'response',
                        response: {
                            headers: res.headers,
                            body: body.json,
                            raw: body.raw
                        },
                        statusCode: res.statusCode,
                        time: new Date().toString()
                    });
                });
        }
    }
};

module.exports = BlockPoint;