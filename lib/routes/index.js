var async        = require('async');
var db           = require('../data/db');
var express      = require('express');
var passport     = require('passport');
var passwordHash = require('password-hash')
var request      = require('request');

var router = express.Router();

router.get('/', function(req, res) {
  res.redirect('/hot');
});

router.get('/hot', function(req, res) {

  var data;

  async.series([
    function(next) {
      request("http://www.reddit.com/hot.json", {json: true}, function(err, res, body) {
        data = body.data.children;
        next();
      });
    },
    function() {
      res.render('index/hot', {
        title: 'Hot',
        links: data
      });
    }
  ]);

});

router.get('/top', function(req, res) {

  var data;

  async.series([
    function(next) {
      request("http://www.reddit.com/top.json", {json: true}, function(err, res, body) {
        data = body.data.children;
        next();
      });
    },
    function() {
      res.render('index/top', {
        title: 'Top',
        links: data
      });
    }
  ]);


});

router.get('/favs', function(req, res) {

  var data = [];

  async.series([
    function(next) {
      if (req.user.favs.length > 0) {
        request("http://www.reddit.com/by_id/" + req.user.favs.toString() + ".json", {json: true}, function(err, res, body) {
          data = body.data.children;
          next();
        });
      } else {
        next();
      }
    },
    function() {
      res.render('index/favs', {
        title: 'Favorites',
        links: data
      });
    }
  ]);



});

router.get('/login', function(req, res) {
  res.render('index/login', {
    title: 'myReddit - Login',
    message: req.flash('error')
  });
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/hot',
  failureRedirect: '/login',
  failureFlash: true
}));

router.get('/logout', function(req, res) {
    req.logout();
    req.flash('error', 'You have successfully logged out');
    res.redirect('/login');
});

router.get('/signup', function(req, res) {
  res.render('index/signup', {
    title: 'myReddit - Signup',
    message: req.flash('error')
  });
});


router.post('/signup', function(req, res) {

  async.series([
  	//check if username exists
  	function(next) {
  		db.users.findOne({email: req.body.username},
  			function(err, user) {
  				if (user) {
            next('Username Already Exists.');
          } else {
            next();
          }
  			});
  	},
  	//check if passwords match
  	function(next) {
  		if (req.body.password != req.body.confirmPassword) {
  			next('Passwords didn\'t match :(');
  		} else {
  			next();
  		}
  	},
  	//add to database
  	function(next) {

  		var user = {
  			email: req.body.username,
  			password: passwordHash.generate(req.body.password),
        favs: []
  		};

  		db.users.save(user, function(err) {
        req.flash('error', "User Created! Now log in!");
        res.redirect('/login');
      });
  	}
  	],
  	//return error if necessary
  	function(err, results){
  		//any errors redirect back to sign up
  		//add the error message to flash for display
  		req.flash('error', err);
  		res.redirect('/signup');
  	});


});


module.exports = router;
