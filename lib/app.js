var auth    = require('./app_start/auth');
var config  = require('./app_start/config');
var errors  = require('./app_start/errors');
var express = require('express');
var globals = require('./globals');
var routes  = require('./app_start/routes');

globals.dir = __dirname;
var app = express();

config.init(app);
routes.init(app);
errors.init(app);
auth.init();

module.exports = app;
