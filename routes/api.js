var express = require('express');
var router = express.Router();

// Users
router.get('/users', function(req, res, next) {
    res.render('credits/index');
});

router.put('/user/create', function(req, res, next) {
    res.render('credits/index');
});

router.post('/edit/:id_user', function(req, res, next) {
    //req.params.id_user
    res.render('credits/index');
});

router.get('/user/:id_user', function(req, res, next) {
    res.render('credits/index');
});

router.get('/user/loan/:id_user', function(req, res, next) {
    res.render('credits/index');
});

router.get('/user/credit/:id_user', function(req, res, next) {
    res.render('credits/index');
});

router.get('/user/available/:id_user', function(req, res, next) {
    res.render('credits/index');
});

router.get('/user/available/:id_user', function(req, res, next) {
    res.render('credits/index');
});

//Loan
router.get('/loans', function(req, res, next) {
    res.render('credits/index');
});

router.get('/loan/:id_loan', function(req, res, next) {
    res.render('credits/index');
});

router.post('/loan/edit/:id', function(req, res, next) {
    res.render('credits/index');
});

router.put('/loan/create', function(req, res, next) {
    res.render('credits/index');
});

// Available money

router.get('/availables', function(req, res, next) {
    res.render('credits/index');
});

router.get('/available/:id', function(req, res, next) {
    res.render('credits/index');
});

router.put('/available/create', function(req, res, next) {
    res.render('credits/index');
});

router.post('/available/edit/:id', function(req, res, next) {
    res.render('credits/index');
});

router.delete('/available/delete/:id', function(req, res, next) {
    res.render('credits/index');
});

// Reviews

router.put('/reviews/create', function(req, res, next) {
    res.render('credits/index');
});

router.post('/reviews/edit/:id', function(req, res, next) {
    res.render('credits/index');
});

router.delete('/reviews/delete/:id', function(req, res, next) {
    res.render('credits/index');
});


module.exports = router;
