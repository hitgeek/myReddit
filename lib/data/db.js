var db          = require('../data/db');
var MongoClient = require('mongodb').MongoClient;

var db = {}

db.id = require('mongodb').ObjectId;

MongoClient.connect('mongodb://localhost/myReddit', function(err, mongo) {

  db.users = mongo.collection("users");

});

module.exports = db;