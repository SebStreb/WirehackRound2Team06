const express = require('express');

const Database = require('../models/db_connect');
const User = require('../models/user');
const Loan = require('../models/loan');

const router = express.Router();

const db = new Database('../db.sqlite');
const user = new User(db);
const loan = new Loan(db);

// Users
router.get('/users', function(req, res, next) {
    res.render('credits/index');
});

router.put('/user/create', function(req, res, next) {
  const username = req.body.username;
  const password = req.body.password;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  user.create(username, password, firstName, lastName, email)
    .then(() => res.status(200).send());
    .catch((err) => res.status(500).send());
});

router.post('/edit/:id_user', function(req, res, next) {
  //req.params.id_user
  //res.render('credits/index');
});

router.get('/user/:id_user', function(req, res, next) {
  //res.render('credits/index');
});

router.get('/user/loan/:id_user', function(req, res, next) {
  loan.from_user(req.params.id_user)
    .then((result) => res.status(200).send(result))
    .catch((err) => res.status(500).send())
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
