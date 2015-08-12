var db           = require('../data/db');
var express      = require('express');

var router = express.Router();

router.post('/like/:name', function(req, res) {
  db.users.update(
    { _id: db.id(req.user._id) },
    { $addToSet: { favs: req.params.name } },
    function(err) {
      if (err) {
        console.log(err);
        res.json('false');
      } else {
        res.json('true');
      }
    }
  );
});

router.post('/hate/:name', function(req, res) {
  db.users.update(
    { _id: db.id(req.user._id) },
    { $pull: { favs: req.params.name } },
    function(err) {
      if (err) {
        console.log(err);
        res.json('false');
      } else {
        res.json('true');
      }
    }
  );
});


module.exports = router;