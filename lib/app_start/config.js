var bodyParser   = require('body-parser');
var cookieParser = require('cookie-parser');
var express      = require('express');
var favicon      = require('serve-favicon');
var flash        = require('connect-flash');
var globals      = require('../globals');
var logger       = require('morgan');
var passport     = require('passport');
var path         = require('path');
var session      = require('express-session');


module.exports.init = function(app) {
  app.set('views', path.join(globals.dir, 'views'));
  app.set('view engine', 'jade');

  app.use(favicon(globals.dir + '/public/favicon.ico'));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(globals.dir, 'public')));

  app.use(session({
		secret: '__secret__',
		resave: true,
		saveUninitialized: true
	}));
  app.use(passport.initialize());
	app.use(passport.session());
  app.use(flash());
  app.use(function(req, res, next) {
    res.locals.user = req.user;
    next();
  });

  app.locals.pretty = true;

}