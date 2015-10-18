"use strict";

var gulp = require('gulp');
var path = require('path');
var jshint = require('gulp-jshint');
var karma = require('karma').server;

/**
 * Run the Karma server once with the given config file path.
 */
function runKarma(configFile, cb) {
   karma.start({
      configFile: path.resolve(configFile),
      singleRun: true
   }, cb);
}

gulp.task('test', function(cb) {
   runKarma('karma.conf.js', cb);
});

/*
gulp.task('default', function() {
  console.log("Running gulp default");
});
*/

// configure the jshint task
gulp.task('jshint', function() {
  return gulp.src(['*.js', './app/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('default', ['jshint', 'test']);
