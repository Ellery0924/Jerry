var express = require('express'),
    router = express.Router(),
    service = require('../lib/service');

router
    .route('/proxy/config')
    .get(function (req, res) {

        res.send(service.getConfig());
    })
    .put(function (req, res) {

        service.setConfig(req.body.config);
        res.send({
            ret: 1
        });
    });

router
    .route('/proxy/serverInfo')
    .get(function (req, res) {

        res.send(service.getServerInfo());
    })
    .put(function (req, res) {

        service.setServerInfo(req.body.server);
        res.send({
            ret: 1
        });
    });

module.exports = router;
