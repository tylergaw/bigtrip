'use strict';

// Copies static assets (images, fonts, etc.) into the destination. Provides
// a task for compressing images, which is not called during normal builds.

var _ = require('underscore'),
  gulp = require('gulp'),
  optimize = require('gulp-imagemin'),
  resize = require('gulp-image-resize'),
  rename = require('gulp-rename'),
  config = require('../config'),

  imageTaskNames = [],

// By way of partial application, this function is used to create custom image
// resize/optimize/rename tasks. It takes a string `suffix` that will be
// appended to the generate filename(s) and a hash of `resizeOptions` which are
// passed directly to 'gulp-image-resize'.

  processImages = function (suffix, resizeOptions) {
    if (typeof suffix !== 'string' || !suffix.length) {
      throw new Error('missing or invalid suffix');
    }
    if (!_.isObject(resizeOptions)) {
      throw new Error('missing or invalid resizeOptions');
    }
    return gulp.src(config.assets.images.src, {base: process.cwd()})
      .pipe(resize(resizeOptions))
      .pipe(optimize())
      .pipe(rename(function (path) {
        path.dirname = '';
        path.basename += '-' + suffix;
      }))
      .pipe(gulp.dest(config.assets.images.dest));
  };

gulp.task('assets-fonts', function () {
  return gulp.src(config.assets.fonts.src)
    .pipe(gulp.dest(config.assets.fonts.dest));
});

// This is a simpler task that copies image files from the src to dist. Avoids
// performance problems during watch associated with mass image resizing.
gulp.task('assets-images-copy', function () {
  return gulp.src(config.assets.images.src)
    .pipe(gulp.dest(config.assets.images.dest));
});

// Use the config to set up custom image resize/optimize/rename tasks.
_.each(config.assets.images.sizes, function (value, key) {
  var name = 'assets-images-' + key;
  gulp.task(name, _.partial(processImages, key, value));
  imageTaskNames.push(name);
});

// The 'assets-images-process' task runs all the configured image tasks. If
// there are no configured tasks, it simply calls the 'assets-images-copy' task.
gulp.task('assets-images-process',
  imageTaskNames.length ?
    imageTaskNames :
    ['assets-images-copy']
);

gulp.task('assets', ['assets-fonts', 'assets-images-process']);
