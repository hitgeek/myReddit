var api   = require('../routes/api');
var auth  = require('../app_start/auth');
var index = require('../routes/index');

module.exports.init = function(app) {

  app.use('/hot', auth.loggedIn);
  app.use('/top', auth.loggedIn);
  app.use('/favs', auth.loggedIn);
  app.use('/api', auth.loggedIn);

  app.use('/', index);
  app.use('/api', api);

}