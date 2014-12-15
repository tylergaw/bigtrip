'use strict';

// Copies HTML files from source to destination.

var gulp = require('gulp'),
  config = require('../config');

gulp.task('html', function () {
  gulp.src(config.src + '/*.html')
    .pipe(gulp.dest(config.dest));
});
