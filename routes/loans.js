var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send('GET /');
});

router.get('/show/:id', function(req, res, next) {
  res.send('GET /show/:id');
});

router.get('/create', function(req, res, next) {
  res.send('GET /create');
});

router.post('/create', function(req, res, next) {
  res.send('POST /create');
});

router.get('/edit/:id', function(req, res, next) {
  res.send('GET /edit/:id');
});

router.put('/edit/:id', function(req, res, next) {
  res.send('PUT /edit/:id');
});

router.delete('/delete/:id', function(req, res, next) {
  res.send('DELETE /delete/:id');
});

module.exports = router;
