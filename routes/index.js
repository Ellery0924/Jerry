var express = require('express'),
    router = express.Router();

router.get('/qproxy', function (req, res) {
    res.render('index');
});

module.exports = router;
