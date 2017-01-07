var express = require('express'),
    router = express.Router();
var ver = require('../../../ver.json');

router.get(/\/(qproxy|jerry)/, function (req, res) {
    res.render('index', {
        indexVer: ver.index,
        baseVer: ver.base,
        styleVer: ver.style,
        isDebug: false
    });
});

router.get(/\/devjerry/, function (req, res) {
    res.render('index', {
        baseVer: ver.base,
        styleVer: ver.style,
        indexVer: '',
        isDebug: true
    });
});

module.exports = router;
