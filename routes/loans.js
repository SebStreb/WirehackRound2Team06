var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('loans/index');
});

router.get('/show/:id', function(req, res, next) {
    res.render('loans/show');
});

router.get('/create', function(req, res, next) {
    res.render('loans/create');
});

router.post('/create', function(req, res, next) {
    res.send('POST /create');
});

router.get('/edit/:id', function(req, res, next) {
    res.render('loans/edit');
});

router.put('/edit/:id', function(req, res, next) {
    res.send('PUT /edit/:id');
});

router.delete('/delete/:id', function(req, res, next) {
    res.send('DELETE /delete/:id');
});

module.exports = router;
