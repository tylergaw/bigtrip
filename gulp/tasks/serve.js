'use strict';

// Provides a simple development web server.

var gulp = require('gulp'),
  config = require('../config'),
  webserver = require('gulp-webserver');

gulp.task('serve', function () {
  return gulp.src(config.dest)
    .pipe(webserver({
      port: 8005,
      livereload: true,
      open: false
    }));
});
