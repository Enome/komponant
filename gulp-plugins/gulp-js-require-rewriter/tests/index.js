/*global describe, it*/

var highland = require('highland');
var through = require('through2');

var subject = require('../index.js');

describe('gulp-wrap-commonjs', function () {

  describe('bower modules', function () {

    it('resolve ./', function (done) {

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

    it('resolves ../', function (done) {

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

    it('resolves global module', function (done) {

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

    it.skip('resolves require with variable', function (done) {

      var stream = highland([{ 
        contents: new Buffer('require("./lang" + k);'),
        base: './bower_components',
        cwd:  '/home/user/work/project',
        path: '/home/user/work/project/bower_components/jquery/index.js',
      }]);

      var expected = 'require("jquery/lang" + k);';

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

    it('resolves global module', function (done) {

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


  });

  describe('local files', function () {

    it('resolves ./', function (done) {

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

    it('resolves ../', function (done) {

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

    it('resolves global module', function (done) {

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

});
