/*global describe, it*/

var highland = require('highland');
var through = require('through2');

var subject = require('../index.js');

describe('gulp-css-url-rewriter', function () {

  it('one', function (done) {

    var stream = highland([{ 
      contents: new Buffer('body: { background: url(../fonts/font.ttf); }'),
      base: './bower_components',
      cwd:  '/home/user/work/project',
      path: '/home/user/work/project/bower_components/fontor/css/index.css',
    }]);

    var expected = 'body: { background: url(fontor/fonts/font.ttf); }';

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

  it('one', function (done) {

    var stream = highland([{ 
      contents: new Buffer('body: { background: url(fonts/font.ttf); }'),
      base: './bower_components',
      cwd:  '/home/user/work/project',
      path: '/home/user/work/project/bower_components/fontor/index.css',
    }]);

    var expected = 'body: { background: url(fontor/fonts/font.ttf); }';

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

  it('one', function (done) {

    var stream = highland([{ 
      contents: new Buffer('body: { background: url(font.ttf); }'),
      base: './bower_components',
      cwd:  '/home/user/work/project',
      path: '/home/user/work/project/bower_components/fontor/index.css',
    }]);

    var expected = 'body: { background: url(fontor/font.ttf); }';

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
