var through = require('through2');
var es6ModTransform = require('es6-module-jstransform');

var transform = function (file, enc, callback) {
  file.contents = new Buffer(es6ModTransform(file.contents.toString()).code);
  callback(null, file);
};

var gulpPlugin = function () {
  return through.obj(transform);
};

module.exports = gulpPlugin;
