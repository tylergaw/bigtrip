'use strict';

// Provides a task which watches for changes and performs build tasks when
// those things change.

var gulp = require('gulp'),
  config = require('../config');

gulp.task('watch', function () {

  gulp.watch([
    config.assets.fonts.src,
    config.assets.images.src
  ], ['assets-fonts', 'assets-images-copy']);

  gulp.watch(config.scss.src, ['scss']);

  gulp.watch(config.js.src, ['js']);
  gulp.watch(config.js.tasks, ['js-quality']);

  gulp.watch(config.src + '/**/*.html', ['html']);
});
