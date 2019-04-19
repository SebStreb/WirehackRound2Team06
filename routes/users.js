var express = require('express');
var router = express.Router();

router.get('/create', function(req, res, next) {
    res.render('users/create')
});

router.post('/create', function(req, res, next) {
    res.send('POST /create')
});

module.exports = router;
