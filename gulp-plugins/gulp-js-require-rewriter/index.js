var url = require('url');
var through = require('through2');
var requires = require('requires');

var transform = function (file, enc, callback) {

  var content = requires(file.contents.toString(), function (require) {

    if (require.path[0] === '.') {

      var p = url
        .resolve(file.path, require.path)
        .replace(file.cwd, '')
        .replace('/bower_components/', '');

      return "require(\"" + p + "\")";
    }

    return require.string;

  });


  file.contents = new Buffer(content);
  callback(null, file);

};

var gulpPlugin = function () {
  return through.obj(transform);
};

module.exports = gulpPlugin;
