var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/', function(req, res, next) {
    request('http://localhost:3000/api/projects', function (error, response, body) {
    if (!error && response.statusCode == 200) {
    	console.log(response.body)
        res.render('projects/index', {
        	credits:JSON.parse(response.body),
        	user:req.user
        });
     }
     if(error){
     	console.log(error)
     }
	})
});

router.get('/create', function(req, res, next) {
    res.render('projects/create',{user:req.user})
});

module.exports = router;
