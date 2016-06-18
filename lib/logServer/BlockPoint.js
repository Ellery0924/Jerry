/**
 * Created by Ellery1 on 16/6/18.
 */
var service = require('../service'),
    wsServer = require('./wsServer'),
    URL = require('url'),
    Promise = require('bluebird'),
    unzipBody = require('./bodyUtil').unzipBody,
    parseBody = require('./bodyUtil').parseBody,
    queryToObj = require('./bodyUtil').queryToObj,
    blockPointSetting = service.getBlockPointSetting();

var guid = -1;

function defer() {

    var resolve = null, reject = null;
    var promise = new Promise(function () {
        resolve = arguments[0];
        reject = arguments[1];
    });

    return {
        resolve: resolve,
        reject: reject,
        promise: promise
    };
}

wsServer
    .on('requestBlockPointContinue', function (id) {

        var instance = BlockPoint.instances.find(function (ins) {
            return ins.guid === id;
        });

        if (instance && instance.blocked) {

            instance.requestPromise.resolve();
        }
    })
    .on('responseBlockPointContinue', function (id) {

        var instance = BlockPoint.instances.find(function (ins) {
            return ins.guid === id;
        });

        if (instance && instance.blocked) {

            instance.responsePromise.resolve();
        }
    });

function BlockPoint() {
    this.req = null;
    this.guid = -1;
    this.blocked = false;
    BlockPoint.instances.push(this);
}

BlockPoint.instances = [];

BlockPoint.prototype = {
    checkShouldBeBlocked: function (req) {

        var blList = blockPointSetting.list,
            validList = blList.filter(function (singleSetting) {
                return singleSetting.isOn;
            }),
            contains = validList.some(function (singleSetting) {
                return singleSetting.regex.test(req.url);
            });

        if (contains) {

            this.req = req;
            this.guid = ++guid;
            this.blocked = true;
            return true;
        }
        else {

            return false;
        }
    },
    setRequestPromise: function (creq) {

        var self = this;
        this.requestPromise = defer();
        this.requestPromise.promise.then(function () {
            self.req.pipe(creq);
        });
    },
    setResponsePromise: function (sres) {

        var self = this;
        this.responsePromise = defer();
        this.responsePromise.promise.then(function () {
            self.res.pipe(sres);
        });
    },
    sendRequestLog: function (req) {

        this.req = req;

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
                        id: this.guid,
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
    sendResponseLog: function (res) {

        this.res = res;

        if (this.blocked) {

            unzipBody(res)
                .then(function (ret) {

                    var body = parseBody(ret);

                    wsServer.sockets.emit('blockpoint', {
                        type: 'response',
                        id: this.guid,
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