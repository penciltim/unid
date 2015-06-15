var async = require('async');
var base62 = require('base62');
var redis = require('redis');
var db = redis.createClient();

var i = 0;
async.whilst(
  function() {
    return i < 56800235000;
  },
  function(cb) {
    var id = PermuteId(i);
    var encoded = base62.encode(id);
    console.log(i + ' > ' + encoded + ':id=' + id);
    db.get(encoded, function(err, reply) {
      if (err) return cb(err);
      if (reply === '1')
        return cb(new Error("Collision occur on i = " + i));
      db.set(encoded, '1');
      i++;
      return cb();
    });
  },
  function(err) {
    if (err) {
      db.quit();
      return console.log(err);
    }
    console.log("done");
    db.quit();
  }
);
