var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/', function(req, res, next) {
	if(!req.user)
		res.render("Please connect")
	request('http://localhost:3000/api/userProposal/'+req.user.id, function (error, response, body) {
    if (!error && response.statusCode == 200) {
    	console.log(response.body)
        res.render('loans/index', {
        	proposals:JSON.parse(response.body),
        	user:req.user
        });
     }
     if(error){
     	console.log(error)
     }
})
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
