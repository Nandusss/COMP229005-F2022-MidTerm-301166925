/* *
 * app.js
 * Nandagopan Dilip
 * 301166925
 * 29/10/2022
 * all credits goes to prof. Júlio Vinícius Azevedo de Carvalho
 */

//modules
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let bodyParser = require('body-parser');
let session = require('express-session');
let flash = require('connect-flash');
let passport = require('passport');


let app = express();

//sessions
app.use(session({
  saveUninitialized: true,
  resave: true,
  secret: "sessionSecret"
}));

//routers
let indexRouter = require('../routes/index');
let usersRouter = require('../routes/users');
let todoRouter = require('../routes/todo');

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//root paths
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../node_modules'))); 

// Sets up passport
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//routers initialized
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/todo', todoRouter);

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
  res.render('error');
});

module.exports = app;
