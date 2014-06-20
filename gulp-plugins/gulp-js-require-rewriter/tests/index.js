/*global describe, it*/

var highland = require('highland');
var through = require('through2');

var subject = require('../index.js');

describe('gulp-wrap-commonjs', function () {

  it('one', function (done) {

    var stream = highland([{ 
      contents: new Buffer('require("./extra/index.js");'),
      base: './bower_components',
      cwd:  '/home/user/work/project',
      path: '/home/user/work/project/bower_components/jquery/index.js',
    }]);

    var expected = 'require("jquery/extra/index.js");';

    stream
      .pipe(subject())
      .pipe(through.obj(function (file) {
        file
          .contents
          .toString()
          .should
          .eql(new Buffer(expected).toString());
        done();
      }));

  });

  it('one1', function (done) {

    var stream = highland([{ 
      contents: new Buffer('require("../index.js");'),
      base: './bower_components',
      cwd:  '/home/user/work/project',
      path: '/home/user/work/project/bower_components/jquery/sub/index.js',
    }]);

    var expected = 'require("jquery/index.js");';

    stream
      .pipe(subject())
      .pipe(through.obj(function (file) {
        file
          .contents
          .toString()
          .should
          .eql(new Buffer(expected).toString());
        done();
      }));

  });

  it('two', function (done) {

    var stream = highland([{ 
      contents: new Buffer('require("react/index.js");'),
      base: './bower_components',
      cwd:  '/home/user/work/project',
      path: '/home/user/work/project/bower_components/jquery/index.js',
    }]);

    var expected = 'require("react/index.js");';

    stream
      .pipe(subject())
      .pipe(through.obj(function (file) {
        file
          .contents
          .toString()
          .should
          .eql(new Buffer(expected).toString());
        done();
      }));

  });

  it('three', function (done) {

    var stream = highland([{ 
      contents: new Buffer('require("./extra.js");'),
      base: '/home/user/work/project',
      cwd:  '/home/user/work/project',
      path: '/home/user/work/project/index.js',
    }]);

    var expected = 'require("/extra.js");';

    stream
      .pipe(subject())
      .pipe(through.obj(function (file) {
        file
          .contents
          .toString()
          .should
          .eql(new Buffer(expected).toString());
        done();
      }));

  });

  it('four', function (done) {

    var stream = highland([{ 
      contents: new Buffer('require("../index.js");'),
      base: '/home/user/work/project',
      cwd:  '/home/user/work/project',
      path: '/home/user/work/project/sub/extra.js',
    }]);

    var expected = 'require("/index.js");';

    stream
      .pipe(subject())
      .pipe(through.obj(function (file) {
        file
          .contents
          .toString()
          .should
          .eql(new Buffer(expected).toString());
        done();
      }));

  });

  it('five', function (done) {

    var stream = highland([{ 
      contents: new Buffer('require("react/index.js");'),
      base: '/home/user/work/project',
      cwd:  '/home/user/work/project',
      path: '/home/user/work/project/index.js',
    }]);

    var expected = 'require("react/index.js");';

    stream
      .pipe(subject())
      .pipe(through.obj(function (file) {
        file
          .contents
          .toString()
          .should
          .eql(new Buffer(expected).toString());
        done();
      }));

  });

});
