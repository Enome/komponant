var gulp = require('gulp');
var clean = require('gulp-rimraf');
var komponant = require('komponant');

gulp.task('clean', function () {
  return gulp
    .src('build/', {read: false})
    .pipe(clean());
});

gulp.task('scripts', function () {

  return komponant
    .scripts()
    .pipe(gulp.dest('build/'));

});

gulp.task('styles', function () {

  return komponant
    .styles()
    .pipe(gulp.dest('build/'));

});

gulp.task('files', function () {

  return komponant
    .files()
    .pipe(gulp.dest('build/'));

});

gulp.task('default', ['scripts', 'files', 'styles']);
