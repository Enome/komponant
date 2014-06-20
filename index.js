var gulp = require('gulp');
var es = require('event-stream');

/* Global gulps */

var myth = require('gulp-myth');
var react = require('gulp-react');
var concat = require('gulp-concat');
var filter = require('gulp-filter');
var bower = require('gulp-bower-files');
var gulpIf = require('gulp-if');
var isEs6Module = require('is-module');

/* Local gulps */

var addRequire = require('./gulp-plugins/gulp-add-require');
var wrapCommonjs = require('./gulp-plugins/gulp-wrap-commonjs');
var cssUrlRewriter = require('./gulp-plugins/gulp-css-url-rewriter');
var jsRequireRewriter = require('./gulp-plugins/gulp-js-require-rewriter');
var es6ModuleToCommonjs = require('./gulp-plugins/gulp-es6-module-to-commonjs');


/* INSTANCES */

/* Filters */

var filterJs = filter('**/*.js');
var filterCss = filter('**/*.css');
var filterNotJsNotCss =  filter(['!**/*.css', '!**/*.js']);
var filterNotBuild = filter('!build/**');
var filterNotBowerComponents = filter('!bower_components/**');


/* Src */

var bower_files = bower();
var bower_local_files = gulp.src(require(process.cwd() + '/bower.json').main);
var all_files = es.merge(bower_files, bower_local_files);


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


var instances = {

  /* Filters */

  filterJs: filterJs,
  filterCss: filterCss,
  filterNotJsNotCss: filterNotJsNotCss,
  
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
      .pipe(filterNotBuild)
      .pipe(filterNotBowerComponents)
      .pipe(filterJs)
      .pipe(es6ModuleToCommonjs)
      .pipe(react)
      .pipe(wrapCommonjs)
      .pipe(jsRequireRewriter)
      .pipe(concat('build.js'))
      .pipe(addRequire);

  },

  styles: function () {

    return all_files
      .pipe(filterNotBuild)
      .pipe(filterNotBowerComponents)
      .pipe(filterCss)
      .pipe(myth())
      .pipe(cssUrlRewriter)
      .pipe(concat('build.css'));

  },

  files: function () {

    return all_files
      .pipe(filterNotBuild)
      .pipe(filterNotBowerComponents)
      .pipe(filterNotJsNotCss);

  },

};

module.exports = instances;
