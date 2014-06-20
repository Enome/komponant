var gulp = require('gulp');
var clean = require('gulp-clean');

var instances = require('./gulp-plugins-instances');

gulp.task('clean', function () {
  return gulp.src('build/').pipe(clean());
});

gulp.task('scripts', ['clean'], function () {

  return instances
    .scripts()
    .pipe(gulp.dest('build/'));

});

gulp.task('styles', ['clean'], function () {

  return instances
    .styles()
    .pipe(gulp.dest('build/'));

});

gulp.task('files', ['clean'], function () {

  return instances
    .files()
    .pipe(gulp.dest('build/'));

});

gulp.task('default', ['clean', 'scripts', 'styles', 'files']);
