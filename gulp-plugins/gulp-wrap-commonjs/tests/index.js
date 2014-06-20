/*global describe, beforeEach, it*/

var highland = require('highland');
var through = require('through2');

var subject = require('../index.js');
var functions = require('../functions');

describe('gulp-wrap-commonjs', function () {

  var cases;

  beforeEach(function () {

    cases = {

      one: {
        stream: highland([{ 
          contents: new Buffer('content'),
          base: './bower_components',
          cwd:  '/home/user/work/project',
          path: '/home/user/work/project/bower_components/jquery/index.js',
        }]),
        expected: functions.combine('jquery/index.js', 'content')
      },

      two: {
        stream: highland([{ 
          contents: new Buffer('content'),
          base: './bower_components',
          cwd:  '/home/user/work/project',
          path: '/home/user/work/project/bower_components/jquery/extra/index.js',
        }]),
        expected: functions.combine('jquery/extra/index.js', 'content')
      },

      three: {
        stream: highland([{ 
          contents: new Buffer('content'),
          base: '/home/user/work/project',
          cwd:  '/home/user/work/project',
          path: '/home/user/work/project/index.js',
        }]),
        expected: functions.combine('/index.js', 'content')
      },

      four: {
        stream: highland([{ 
          contents: new Buffer('content'),
          base: '/home/user/work/project',
          cwd:  '/home/user/work/project',
          path: '/home/user/work/project/sub/extra.js',
        }]),
        expected: functions.combine('/sub/extra.js', 'content')
      },

    }; 
    
  });

  describe('bower package', function () {

    it('wraps', function (done) {
      cases.one.stream
        .pipe(subject())
        .pipe(through.obj(function (file) {
          file
            .contents
            .toString()
            .should
            .eql(new Buffer(cases.one.expected).toString());
          done();
        }));
    });

    it('wraps 2', function (done) {
      cases.two.stream
        .pipe(subject())
        .pipe(through.obj(function (file) {
          file
            .contents
            .toString()
            .should
            .eql(new Buffer(cases.two.expected).toString());
          done();
        }));
    });

  });

  describe('local files', function () {

    it('wraps', function (done) {
      cases.three.stream
        .pipe(subject())
        .pipe(through.obj(function (file) {
          file
            .contents
            .toString()
            .should
            .eql(new Buffer(cases.three.expected).toString());
          done();
        }));
    });

    it('wraps 2', function (done) {
      cases.four.stream
        .pipe(subject())
        .pipe(through.obj(function (file) {
          file
            .contents
            .toString()
            .should
            .eql(new Buffer(cases.four.expected).toString());
          done();
        }));
    });

  });

});
