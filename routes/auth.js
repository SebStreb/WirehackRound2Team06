var express = require('express');
var passport = require('passport');
var router = express.Router();

router.post('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/auth/create' }));

router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});

router.get('/create', function(req, res, next) {
    res.render('auth/create');
});

router.post('/create', function(req, res, next) {
    res.send('POST /create');
});

router.delete('/delete/:id', function(req, res, next) {
    res.send('DELETE /delete/:id');
});

module.exports = router;
