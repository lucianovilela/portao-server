var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
require('dotenv').config();


var admin = require("firebase-admin");

var serviceAccount = require("./portao-eletronico-dev-firebase-adminsdk-8y7r9-7fca14750b.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

var indexRouter = require('./routes/index');
var portaoRouter = require('./routes/api/portao');
var historicoRouter = require('./routes/api/historico');
var userRouter = require('./routes/api/users');

var app = express();
app.use(cors());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/portao', portaoRouter);
app.use('/api/hist', historicoRouter);
app.use('/api/user', userRouter);



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
