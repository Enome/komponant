var fs = require('fs');
var through = require('through2');

var transform = function (file, enc, callback) {
  var content = fs.readFileSync(__dirname + '/require-method.js') + file.contents.toString();
  file.contents = new Buffer(content);
  callback(null, file);
};

var gulpPlugin = function () {
  return through.obj(transform);
};

module.exports = gulpPlugin;
