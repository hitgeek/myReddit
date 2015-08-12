var db            = require('../data/db');
var LocalStrategy = require('passport-local').Strategy;
var passport      = require('passport')
var passwordHash  = require('password-hash');


module.exports.init = function() {

	passport.use(new LocalStrategy(function(username, password, done) {
		db.users.findOne({ email: username }, function(err, user) {
			if (err) { return done(err); }
			if (!user) { return done(null, false, { message: 'Login Failed' }); }
			if (!passwordHash.verify(password, user.password)) { return done(null, false, { message: 'Login Failed' }); }
			return done(null, user);
		});

	}));

	passport.serializeUser(function(user, done) {
	  done(null, user._id);
	});

	passport.deserializeUser(function(id, done) {
    db.users.findOne({_id: db.id(id)}, function(err, data){
      done(null, data);
    });
	});

}

module.exports.loggedIn = function(req, res, next) {
	if (req.user) { next(); } else { res.redirect('/login'); }
}
