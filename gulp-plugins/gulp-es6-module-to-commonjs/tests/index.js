/*global describe, it*/

var rerequire = require('rerequire');
var highland = require('highland');
var through = require('through2');

describe('gulp-es6-module-to-commonjs', function () {

  it('calls the es6-module with the right stuff.', function (done) {

    var called = false;
    var called_with = '';

    var es6ModuleToCommonjs = rerequire('../index', {
        'es6-module-jstransform': function (s) {
          called = true;
          called_with = s;
          return { code: 'code' };
        },
      }, { 'Buffer': Buffer }
    );

    highland([{ contents: new Buffer('content') }])
      .pipe(es6ModuleToCommonjs())
      .pipe(through.obj(function (file) {

        called
          .should
          .eql(true);

        called_with
          .should
          .eql('content');

        file
          .contents
          .should
          .eql(new Buffer('code'));

        done();

      }));

  });

});
