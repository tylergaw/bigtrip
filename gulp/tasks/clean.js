'use strict';

// This task cleans out any existing build and cached/generated files.

var gulp = require('gulp'),
  rimraf = require('rimraf'),
  config = require('../config');

gulp.task('clean', function (done) {
  rimraf.sync('./.sass-cache');
  rimraf.sync(config.dest);
  rimraf.sync(config.js.tests.dest);
  done();
});
