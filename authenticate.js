var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/users');

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


exports.getToken = function(user) {
    return jwt.sign(user, process.env.SECRET_KEY,
        {expiresIn: 600});
};

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_KEY;

exports.jwtPassport = passport.use(new JwtStrategy(opts,
    (jwt_payload, done) => {
        User.findOne({_id: jwt_payload._id}, (err, user) => {
            if (err) {
                return done(err, false);
            }
            else if (user) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        });
    }));

exports.verifyUser = passport.authenticate('jwt', {session: false});

exports.verifyAdmin = function(req, _, next){
    console.log(req.user.admin);
    if (req.user.admin ?? false) {
        return next();
    }
    else {
        var err =  new Error ('You are not autorized to perform this operation!');
        err.status =  403;
        return next(err);

    }
}

