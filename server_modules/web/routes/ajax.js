var express = require('express'),
    router = express.Router(),
    service = require('../../service');

router
    .route('/proxy/config')
    .get(function (req, res) {
        res.send(service.getConfig(true));
    })
    .put(function (req, res) {
        service.setConfig(req.body.config);
        res.send({ret: 1});
    });

router
    .route('/proxy/serverInfo')
    .get(function (req, res) {
        res.send(service.getServerInfo());
    })
    .put(function (req, res) {
        service.setServerInfo(req.body);
        res.send({ret: 1});
    });

router
    .route('/qproxy/blockPointSetting')
    .get(function (req, res) {
        res.send(service.getBlockPointSetting());
    })
    .put(function (req, res) {
        service.setBlockPointSetting(req.body.setting);
        res.send({ret: 1});
    });

module.exports = router;
