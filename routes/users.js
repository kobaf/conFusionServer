var express = require('express');
var router = express.Router();
var User = require('../models/users');
var passport = require('passport');
var authenticate = require('../authenticate');
const cors = require('./cors');

router.options('*', cors.corsWithOptions, (req, res) => { res.sendStatus(200); } )


router.get('/', cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    User.find({})
    .then((users) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(users);
    }, (err) => next(err))
    .catch((err) => next(err));
});


router.get('/current',cors.corsWithOptions,  (req, res, next) => {
  if (req.user) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({id: req.user._id, logged: true, name: req.user.username, admin: req.user.admin});
  }
  else
  {      
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({logged: false});
}
});


router.post('/login', cors.corsWithOptions, (req, res, next) => {

  passport.authenticate('local', (err, user, info) => {
    if (err)
      return next(err);

    if (!user) {
      res.statusCode = 401;
      res.setHeader('Content-Type', 'application/json');
      res.json({success: false, status: 'Login Unsuccessful!', err: info});
    }
    req.logIn(user, (err) => {
      if (err) {
        res.statusCode = 401;
        res.setHeader('Content-Type', 'application/json');
        res.json({success: false, status: 'Login Unsuccessful!', err: 'Could not log in user!'});          
      }

      var token = authenticate.getToken({_id: req.user._id});
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json({success: true, status: 'Login Successful!', token: token});
    }); 
  }) (req, res, next);
});

router.post('/login', cors.corsWithOptions,  passport.authenticate('local'), (req, res) => {

  var token = authenticate.getToken({_id: req.user._id});
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({success: true, token: token, status: 'You are successfully logged in!'});
});

router.get('/logout', cors.corsWithOptions, (req, res, next) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

router.get('/facebook/token', passport.authenticate('facebook-token'), (req, res) => {
  if (req.user) {
    var token = authenticate.getToken({_id: req.user._id});
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({success: true, token: token, status: 'You are successfully logged in!'});
  }
});

router.get('/checkJWTtoken', cors.corsWithOptions, (req, res) => {
  passport.authenticate('jwt', {session: false}, (err, user, info) => {
    if (err)
      return next(err);
    
    if (!user) {
      res.statusCode = 401;
      res.setHeader('Content-Type', 'application/json');
      return res.json({status: 'JWT invalid!', success: false, err: info});
    }
    else {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      return res.json({status: 'JWT valid!', success: true, user: user});

    }
  }) (req, res);
});



module.exports = router;

