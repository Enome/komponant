/*global describe, it*/

var fs = require('fs');
var addRequire = require('../index');
var highland = require('highland');
var through = require('through2');

var require_method_string = fs.readFileSync(__dirname + '/../require-method.js');

describe('gulp-add-require', function () {

  it('adds the require method to the file', function (done) {

    highland([{ contents: new Buffer('foo') }])
      .pipe(addRequire())
      .pipe(through.obj(function (file) {
        file
          .contents
          .toString()
          .should
          .eql(require_method_string + 'foo');

        done();
      }));
    
  });

});
