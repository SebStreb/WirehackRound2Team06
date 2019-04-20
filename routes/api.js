const express = require('express');

const Database = require('../models/db_connect');
const User = require('../models/user');
const Loan = require('../models/loan');
const Review = require('../models/review');
const Payment = require('../models/payment');
const Project = require('../models/project');
const Proposal = require('../models/proposal');

const router = express.Router();

const db = new Database('./db.sqlite');
const user = new User(db);
const loan = new Loan(db);
const review = new Review(db);
const payment = new Payment(db);
const project = new Project(db);
const proposal = new Proposal(db);

// Users

router.get('/users', function(req, res, next) {
    res.render('NotImplemented');
});

router.post('/user/create', function(req, res, next) {
  const username = req.body.username;
  const password = req.body.password;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  user.create(username, password, firstName, lastName, email)
    .then(() => res.redirect(307, '/auth/login'))
    .catch((err) => res.status(500).send(err));
});

router.post('/edit/:id_user', function(req, res, next) {
  res.render('NotImplemented');
});

router.get('/user/:id_user', function(req, res, next) {
  const id_user = req.params.id_user;
  user.get(id_user)
    .then((result) => res.status(200).send(result))
    .catch((err) => res.status(500).send(err));
});

router.get('/user/name/:username', function(req, res, next) {
  const username = req.params.username;
  user.find(username)
    .then((result) => res.status(200).send(result))
    .catch((err) => res.status(500).send(err));
});

router.get('/user/loan/:id_user', function(req, res, next) {
  loan.from_user(req.params.id_user)
    .then((result) => res.status(200).send(result))
    .catch((err) => res.status(500).send(err))
});

router.get('/user/credit/:id_user', function(req, res, next) {
  loan.to_user(req.params.id_user)
    .then((result) => res.status(200).send(result))
    .catch((err) => res.status(500).send(err))
});

router.get('/user/proposal/:id_user', function(req, res, next) {
  proposal.from_user(req.params.id_user)
    .then((result) => res.status(200).send(result))
    .catch((err) => res.status(500).send(err))
});

//Loans

router.get('/loans', function(req, res, next) {
  loan.all()
    .then((result) => res.status(200).send(result))
    .catch((err) => res.status(500).send(err));
});

router.get('/loan/:id_loan', function(req, res, next) {
  const id_loan = req.params.id_loan;
  loan.get(id_loan)
    .then((result) => res.status(200).send(result))
    .catch((err) => res.status(500).send(err));
});

router.post('/loan/edit/:id', function(req, res, next) {
  res.render('NotImplemented');
});

router.post('/loan/create', function(req, res, next) {
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;
  const loaner = req.body.loaner;
  const crediter = req.body.crediter;
  const amount = req.body.amount;
  const interest = req.body.interest;
  loan.create(endDate, startDate, interest, amount, loaner, crediter)
    .then(() => res.status(200).send())
    .catch((err) => res.status(500).send(err));
});

// Available money

router.get('/proposals', function(req, res, next) {
  proposal.all()
    .then((result) => res.status(200).send(result))
    .catch((err) => res.status(500).send(err));
});

router.get('/proposal/:id', function(req, res, next) {
  proposal.find(req.params.id)
    .then((result) => res.status(200).send(result))
    .catch((err) => res.status(500).send(err));
});

router.get('/userProposal/:user', function(req, res, next) {
  proposal.from_user(req.params.user)
    .then((result) => res.status(200).send(result))
    .catch((err) => res.status(500).send(err));
});

router.post('/proposal/create', function(req, res, next) {
  const date = req.body.deadline;
  const user = req.user.id;
  const amount = req.body.amount;
  const interest = req.body.interest_rate;
  proposal.create(user, amount, interest, date)
    .then(() => res.status(200).redirect('/loans'))
    .catch((err) => {console.error(err); res.status(500).send(err)});
});

router.get('/proposal/best/:amount', function(req, res, next) {
  const amount = req.params.amount;
  proposal.best(amount)
    .then((result) => res.status(200).send(result))
    .catch((err) => res.status(500).send(err));
});

router.post('/proposal/accept', function(req, res, next) {
  const proposal_id = req.body.proposal_id;
  const user_id = req.body.user_id;
  // TODO add amount to accept and dimish proposal by amount
  const now = new Date();
  proposal.find(user_id)
    .then((proposal) => {
      loan.create(proposal.finalDate, now.toString(), proposal.interest, proposal.amount, proposal.user_id, user_id)
        .then(() => res.status(200).send())
        .catch((err) => res.status(500).send(err));
    })
    .catch((err) => res.status(500).send(err));
});

router.post('/proposal/edit/:id', function(req, res, next) {
    res.render('NotImplemented');
});

router.delete('/proposal/delete/:id', function(req, res, next) {
    res.render('NotImplemented');
});

// Reviews

router.post('/reviews/create', function(req, res, next) {
  const date = Date.now();
  const from = req.body.fromId;
  const to = req.body.toId;
  const rating = req.body.rating;
  const comment = req.body.comment;
  review.create(date.toString(), from, to, rating, comment)
    .then(() => res.status(200).send())
    .catch((err) => res.status(500).send(err));
});

router.get('/reviews/all/:user', function(req, res, next) {
  const user = req.params.user;
  review.of(user)
    .then((result) => res.status(200).send(result))
    .catch((err) => res.status(500).send(err));
});

router.post('/reviews/edit/:id', function(req, res, next) {
    res.render('NotImplemented');
});

router.delete('/reviews/delete/:id', function(req, res, next) {
    res.render('NotImplemented');
});

// Payment

// Project

router.get('/projects', function(req, res, next) {
  project.all()
    .then((result) => res.status(200).send(result))
    .catch((err) => {console.log(err); res.status(500).send(err)});
});

router.get('/project/:project_id', function(req, res, next) {
  project.get(req.params.project_id)
    .then((result) => res.status(200).send(result))
    .catch((err) => res.status(500).send(err));
});

router.get('/project/all/:user', function(req, res, next) {
  const user = req.params.user;
  project.from_user(user)
    .then((result) => res.status(200).send(result))
    .catch((err) => res.status(500).send(err));
});

router.post('/project/create', function(req, res, next) {
  const demand = req.body.demand;
  const description = req.body.description;
  const image_url = req.body.image;
  const project_url = req.body.url;
  const user = req.body.user_id;
  const title = req.body.title;
  project.create(demand, description, image_url, project_url, user, title)
    .then(() => res.redirect('/projects'))
    .catch((err) => {console.log(err);res.status(500).send(err)});
});

module.exports = router;
