var express = require('express');
var router = express.Router();

router.get('/create', function(req, res, next) {
    res.render('users/create')
});

module.exports = router;
