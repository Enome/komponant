var through = require('through2');
var cssUrlRewriter = require('css-url-rewriter');

var componentName = function (path) {
  var parts = path.split('/');
  return parts[parts.indexOf('bower_components') + 1];
};

var prefix = function (name, url) {
  var r = url.replace(/^((\.+)?\/)+/, '');
  r = name + '/' + r;
  return r;
};

var transform = function (file, enc, callback) {

  var name = componentName(file.path);

  if (name) {
    name = '/' + name;
  }

  name = 'files' + name;

  var content = cssUrlRewriter(file.contents.toString(), function (url) {
    return prefix(name, url);
  });

  file.contents = new Buffer(content);
  callback(null, file);

};

var gulpPlugin = function () {
  return through.obj(transform);
};

module.exports = gulpPlugin;
