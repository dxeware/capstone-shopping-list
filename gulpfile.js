"use strict";

var gulp = require('gulp');
var jshint = require('gulp-jshint');

gulp.task('default', function() {
  console.log("Running gulp default");
});

// configure the jshint task
gulp.task('jshint', function() {
  return gulp.src(['*.js', './app/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});
