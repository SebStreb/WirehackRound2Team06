var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/', function(req, res, next) {
	console.log("Trying")
	request('http://localhost:3000/api/proposal/'+req.user.id, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        res.render('loans/index', {proposals:response.body});
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
