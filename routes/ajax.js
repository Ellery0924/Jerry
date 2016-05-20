var express = require('express'),
    router = express.Router(),
    filter = require('../lib/proxy').filter;

router
    .route('/proxy/config')
    .get(function (req, res) {

        res.send(filter.getConfig());
    })
    .put(function (req, res) {

        filter.setConfig(req.body.config);
        res.send({
            ret: 1
        });
    });

router
    .route('/proxy/serverInfo')
    .get(function (req, res) {

        res.send(filter.getServerInfo());
    })
    .put(function (req, res) {

        filter.setServerInfo(req.body.server);
        res.send({
            ret: 1
        });
    });

module.exports = router;
