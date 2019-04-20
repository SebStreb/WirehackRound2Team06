var express = require('express');
var router = express.Router();
var request = require('request');

const Database = require('../models/db_connect');

const Project = require('../models/project');
const Proposal = require('../models/proposal');
const Loan = require('../models/loan')

const db = new Database('./db.sqlite');

const project = new Project(db);
const proposal = new Proposal(db);
const loan = new Loan(db);

router.get('/', function(req, res, next) {
    if(!req.user)
		res.render("Please connect")
	request('http://localhost:3000/api/user/loan/'+req.user.id, function (error, response, body) {
    if (!error && response.statusCode == 200) {
    	console.log(response.body)
        res.render('credits/index', {
        	credits:JSON.parse(response.body),
        	user:req.user
        });
     }
     if(error){
     	console.log(error)
     }
})
});

router.get('/showCredits', function(req, res, next) {
    if(!req.user)
		res.render("Please connect")
	request('http://localhost:3000/api/proposals', function (error, response, body) {
    if (!error && response.statusCode == 200) {
    	console.log(response.body)
        res.render('credits/show_credits', {
        	credits:JSON.parse(response.body),
        	user:req.user
        });
     }
     if(error){
     	console.log(error)
     }
})
});

router.get('/apply/:proposal_id', function(req, res, next) {
  const proposal_id = req.params.proposal_id;
  proposal.find(proposal_id)
    .then((proposal) => {
      project.from_user(req.user.id)
        .then((projects) => {
          res.render('credits/apply', {
            proposal: proposal,
            projects: projects
          })
        })
        .catch((err) => res.status(500).send(err));
    })
    .catch((err) => res.status(500).send(err));
});

router.post('/apply', function(req, res, next) {
  const date_end = req.body.deadline;
  const date_start = new Date();
  const interest_rate = req.body.interest_rate;
  const amount = req.body.amount;
  const loaner = req.body.loaner;
  const credits = req.user.id;

  const proposal_id = req.body.proposal_id;
  const project_id = req.body.project_id;

  loan.create(date_end, date_start.toString(), interest_rate, amount, loaner, credits)
    .then(() => {
      proposal.del(proposal_id)
        .then(() => {
          project.del(project_id)
            .then(() => res.redirect('/loans'))
            .catch((err) => res.status(500).send(err));
        })
        .catch((err) => res.status(500).send(err));
    })
    .catch((err) => res.status(500).send(err));
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
