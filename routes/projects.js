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

    request('http://localhost:3000/api/projects', function (error, response, body) {
    if (!error && response.statusCode == 200) {
    	console.log(response.body)
        res.render('projects/index', {
        	projects:JSON.parse(response.body),
        	user:req.user
        });
     }
     if(error){
     	console.log(error)
     }
	})
});

router.get('/create', function(req, res, next) {
    res.render('projects/create',{user: req.user});
});

router.get('/list', function(req, res, next) {
    if (!req.user)
        res.render("Please connect")

    request('http://localhost:3000/api/project/all/' + req.user.id, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(response.body)

            res.render('projects/list', {
                projects: JSON.parse(response.body),
                user: req.user
            });
         }

         if(error){
            console.log(error)
         }
    });
});

router.get('/invest/:project_id', function(req, res, next) {
  const project_id = req.params.project_id;
  project.get(project_id)
    .then((project) => {
      res.render('projects/invest', { project: project })
    })
    .catch((err) => res.status(500).send(err));
});

router.post('/invest', function(req, res, next) {
  const date_end = req.body.deadline;
  const date_start = new Date();
  const interest_rate = req.body.interest_rate;
  const amount = req.body.amount;
  const loaner = req.user.id;
  const credits = req.body.credits;

  const project_id = req.body.project_id;

  loan.create(date_end, date_start.toString(), interest_rate, amount, loaner, credits)
    .then(() => {
      project.del(project_id)
        .then(() => res.redirect('/loans'))
        .catch((err) => res.status(500).send(err));
    })
    .catch((err) => {console.error(error);res.status(500).send(err)});
});

module.exports = router;
