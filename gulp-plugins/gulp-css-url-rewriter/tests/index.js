/*global describe, it*/

var highland = require('highland');
var through = require('through2');

var subject = require('../index.js');

describe('gulp-css-url-rewriter', function () {

  describe('bower files', function () {

    it('resolves ./', function (done) {

      var stream = highland([{ 
        contents: new Buffer('body: { background: url(./fonts/font.ttf); }'),
        base: './bower_components',
        cwd:  '/home/user/work/project',
        path: '/home/user/work/project/bower_components/fontor/css/index.css',
      }]);

      var expected = 'body: { background: url(files/fontor/fonts/font.ttf); }';

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
        contents: new Buffer('body: { background: url(../fonts/font.ttf); }'),
        base: './bower_components',
        cwd:  '/home/user/work/project',
        path: '/home/user/work/project/bower_components/fontor/css/index.css',
      }]);

      var expected = 'body: { background: url(files/fontor/fonts/font.ttf); }';

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

    it('resolve ', function (done) {

      var stream = highland([{ 
        contents: new Buffer('body: { background: url(font.ttf); }'),
        base: './bower_components',
        cwd:  '/home/user/work/project',
        path: '/home/user/work/project/bower_components/fontor/index.css',
      }]);

      var expected = 'body: { background: url(files/fontor/font.ttf); }';

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
        contents: new Buffer('body: { background: url(./fonts/font.ttf); }'),
        base: './',
        cwd:  '/home/user/work/project',
        path: '/home/user/work/project/index.css',
      }]);

      var expected = 'body: { background: url(files/fonts/font.ttf); }';

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
        contents: new Buffer('body: { background: url(../fonts/font.ttf); }'),
        base: './',
        cwd:  '/home/user/work/project',
        path: '/home/user/work/project/index.css',
      }]);

      var expected = 'body: { background: url(files/fonts/font.ttf); }';

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

    it('resolve ', function (done) {

      var stream = highland([{ 
        contents: new Buffer('body: { background: url(font.ttf); }'),
        base: './',
        cwd:  '/home/user/work/project',
        path: '/home/user/work/project/index.css',
      }]);

      var expected = 'body: { background: url(files/font.ttf); }';

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
