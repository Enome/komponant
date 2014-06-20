var through = require('through2');
var functions = require('./functions');

var transform = function (file, enc, callback) {
  var path = file.path.replace(file.cwd, '').replace('/bower_components/', '');
  file.contents = new Buffer(functions.combine(path, file.contents.toString()));
  callback(null, file);
};

var gulpPlugin = function () {
  return through.obj(transform);
};

module.exports = gulpPlugin;
