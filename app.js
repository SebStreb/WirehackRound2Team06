var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var bodyParser = require('body-parser');
var passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loansRouter = require('./routes/loans');
var creditsRouter = require('./routes/credits');
var projectsRouter = require('./routes/projects');
var authRouter = require('./routes/auth');
var apiRouter = require('./routes/api');

const Database = require('./models/db_connect');
const User = require('./models/user');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views/'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static("public"));
app.use(session({ secret: "cats" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/loans', loansRouter);
app.use('/credits', creditsRouter);
app.use('/projects', projectsRouter);
app.use('/auth', authRouter);
app.use('/api', apiRouter);

const db = new Database('./db.sqlite');
const user = new User(db);

passport.use(new LocalStrategy(
  function(username, password, done) {
    user.connect(username, password)
      .then((user) => done(null, user))
      .catch((err) => done(null, false, { message: err }));
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  user.get(id)
    .then((user) => done(null, user))
    .catch((err) => done(err));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.message);
});

module.exports = app;
