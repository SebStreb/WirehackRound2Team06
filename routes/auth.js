var express = require('express');
var router = express.Router();

router.get('/create', function(req, res, next) {
    res.render('auth/create');
});

router.post('/create', function(req, res, next) {
    res.send('POST /create');
});

router.delete('/delete/:id', function(req, res, next) {
    res.send('DELETE /delete/:id');
});

module.exports = router;
