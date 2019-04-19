var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('credits/index');
});

router.get('/show/:id', function(req, res, next) {
    res.render('credits/show');
});

router.get('/create', function(req, res, next) {
    res.render('credits/create');
});

router.post('/create', function(req, res, next) {
    res.send('POST /create');
});

router.get('/edit/:id', function(req, res, next) {
    res.render('credits/edit');
});

router.put('/edit/:id', function(req, res, next) {
    res.send('PUT /edit/:id');
});

router.delete('/delete/:id', function(req, res, next) {
    res.send('DELETE /delete/:id');
});

module.exports = router;
