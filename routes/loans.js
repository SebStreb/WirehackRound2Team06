var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/show/:id', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/create', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/create', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/edit/:id', function(req, res, next) {
  res.send('respond with a resource');
});

router.put('/edit/:id', function(req, res, next) {
  res.send('respond with a resource');
});

router.delete('/delete/:id', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
