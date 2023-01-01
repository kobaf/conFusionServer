var createError = require('http-errors');
require('dotenv').config()
var express = require('express');
var path = require('path');
var logger = require('morgan');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
//var auth = require('./auth');
var passport = require('passport');


const mongoose = require('mongoose');
//const url = config.mongoUrl;
const url = process.env.MONGOURL;

const connect = mongoose.connect(url);



connect.then((db) => {
    console.log("Connected correctly to server");
}, (err) => { console.log(err); });

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const favoriteRouter = require('./routes/favoriteRouter');
const dishRouter = require('./routes/dishRouter');
const promoRouter = require('./routes/promoRouter');
const leaderRouter = require('./routes/leaderRouter');
const uploadRouter = require('./routes/uploadRouter');
var commentRouter = require('./routes/commentRouter');



const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Secure traffic only
app.all('*', (req, res, next) => {
  if (req.secure) {
    return next();
  }
  else {
    res.redirect(307, 'https://' + req.hostname + ':' + app.get('secPort') + req.url);
  }
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({
  name: 'session-id',
  secret: '1234567890-0987654321',
  saveUninitialized: false,
  resave: false,
  store: new FileStore()
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/users', usersRouter);
//app.use(auth);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/dishes', dishRouter);
app.use('/promos', promoRouter);
app.use('/leaders', leaderRouter);
app.use('/imageUpload',uploadRouter);
app.use('/favorites',favoriteRouter);
app.use('/comments',commentRouter);



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
