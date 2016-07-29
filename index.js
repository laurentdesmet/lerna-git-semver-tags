'use strict';
var exec = require('child_process').exec;
var semverValid = require('semver').valid;
var regex = /tag:\s*(([^,)]+)@(.+?))[,\)]/gi;
var cmd = 'git log --decorate --no-color';

module.exports = function(packageName, callback) {
  exec(cmd, {
    maxBuffer: Infinity
  }, function(err, data) {
    if (err) {
      callback(err);
      return;
    }

    var tags = [];

    data.split('\n').forEach(function(decorations) {
      var match;
      while (match = regex.exec(decorations)) {
        var tag = match[1];
        var name = match[2];
        var version = match[3];
        if (name === packageName && semverValid(version)) {
          tags.push(tag);
        }
      }
    });

    callback(null, tags);
  });
};
