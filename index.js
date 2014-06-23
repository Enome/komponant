var gulp = require('gulp');
var es = require('event-stream');

/* Global gulps */

var myth = require('gulp-myth');
var react = require('gulp-react');
var concat = require('gulp-concat');
var filter = require('gulp-filter');
var bower = require('gulp-bower-files');
var gulpIf = require('gulp-if');
var rename = require('gulp-rename');
var isEs6Module = require('is-module');

/* Local gulps */

var addRequire = require('./gulp-plugins/gulp-add-require');
var wrapCommonjs = require('./gulp-plugins/gulp-wrap-commonjs');
var cssUrlRewriter = require('./gulp-plugins/gulp-css-url-rewriter');
var jsRequireRewriter = require('./gulp-plugins/gulp-js-require-rewriter');
var es6ModuleToCommonjs = require('./gulp-plugins/gulp-es6-module-to-commonjs');


/* INSTANCES */

/* Src */

var bower_files = bower();
var bower_local_files;
var all_files;

var bower_local = require(process.cwd() + '/bower.json');
var bower_local_main = bower_local.main;

if (bower_local_main) {
  bower_local_files = gulp.src(bower_local_main, { base: './' });
  all_files = es.merge(bower_files, bower_local_files);
} else {
  all_files = bower_files;
}


/* Scripts */

var es6ModuleToCommonjs = gulpIf(function (file) { 
  return isEs6Module(file.contents.toString()); 
}, es6ModuleToCommonjs());

var react = gulpIf(function (file) { 
  return file.contents.toString().indexOf('/** @jsx') !== -1; 
}, react());

var wrapCommonjs = wrapCommonjs();
var jsRequireRewriter = jsRequireRewriter();
var addRequire = addRequire();

/* Styles */

var cssUrlRewriter = gulpIf(function (file) { 
  return file.contents.toString().indexOf('url') !== -1; 
}, cssUrlRewriter());

/* Files */

var prepend_local_files = gulpIf(function (file) {
  return file.path.indexOf('bower_components') === -1;
}, rename(function (path) {
  path.dirname = 'files' + '/' + path.dirname;
}));

var prepend_bower_files = gulpIf(function (file) {
  return file.path.indexOf('bower_components') !== -1;
}, rename(function (path) {
  path.dirname = 'files/' + path.dirname;
}));

/* Debug */

var through = require('through2');

var debug = through.obj(function (file, enc, cb) {
  console.log('path', file.path);
  console.log('base', file.base);
  cb(null, file);
});

/* Exports */

var komponant = {
  
  /* Files */

  bower_files: bower_files,
  bower_local_files: bower_local_files,
  all_files: all_files,

  /* Scripts */

  es6ModuleToCommonjs: es6ModuleToCommonjs,
  react: react, 
  wrapCommonjs: wrapCommonjs,
  jsRequireRewriter: jsRequireRewriter,
  addRequire: addRequire,

  /* Styles */

  cssUrlRewriter: cssUrlRewriter,

  /* Combinations */

  scripts: function () {

    return all_files
      .pipe(filter(['**/*.js']))
      .pipe(es6ModuleToCommonjs)
      .pipe(react)
      .pipe(wrapCommonjs)
      .pipe(jsRequireRewriter)
      .pipe(concat('build.js'))
      .pipe(addRequire);

  },

  styles: function () {

    return all_files
      .pipe(filter(['**/*.css']))
      .pipe(cssUrlRewriter)
      .pipe(concat('build.css'))
      .pipe(myth());

  },

  files: function () {

    return all_files
      .pipe(filter(['!**/*.css', '!**/*.js']))
      .pipe(prepend_local_files)
      .pipe(prepend_bower_files);

  },

};

module.exports = komponant;
