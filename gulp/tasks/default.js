'use strict';

// Defines the default task run when calling `gulp`.

var gulp = require('gulp');

gulp.task('default', [
  'clean',
  'assets',
  'html',
  'scss',
  'js'
]);
