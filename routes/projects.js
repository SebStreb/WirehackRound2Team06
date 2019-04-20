var express = require('express');
var router = express.Router();
var request = require('request');

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

module.exports = router;
