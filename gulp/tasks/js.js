'use strict';

// Provides tasks related to JavaScript quality, testing, concatenation, and
// minification.

var gulp = require('gulp'),
  gulpif = require('gulp-if'),
  plumber = require('gulp-plumber'),
  browserify = require('browserify'),
  transform = require('vinyl-transform'),
  uglify = require('gulp-uglify'),
  jshint = require('gulp-jshint'),
  jscs = require('gulp-jscs'),
  mochaPhantomJs = require('gulp-mocha-phantomjs'),
  config = require('../config'),
  prod = (process.env.NODE_ENV === 'production');

// Checks code quality for common, non-stylistic errors.
gulp.task('js-lint', function () {
  return gulp.src([config.js.src, config.js.tasks, config.js.tests.src])
    .pipe(plumber())
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

// Checks coding style against established standards.
gulp.task('js-style', function () {
  return gulp.src([config.js.src, config.js.tasks, config.js.tests.src])

    // We don't want JSCS to halt Gulp if there are more than 16 files OR an
    // error. Breaks watch among other things.
    // See: https://github.com/jscs-dev/gulp-jscs/issues/22
    .pipe(plumber({
      errorHandler: function () {
        this.emit('end');
      }
    }))
    .pipe(jscs());
});

// Prepares tests for running by building them with Browserify.
gulp.task('js-test-prep', function () {
  return gulp.src(config.js.tests.entry)
    .pipe(plumber())
    .pipe(transform(function (filename) {
      return browserify(filename).bundle();
    }))
    .pipe(gulp.dest(config.js.tests.dest))
});

// Runs Mocha tests in a headless WebKit browser (via PhantomJS).
gulp.task('js-test', ['js-test-prep'], function (done) {
  return gulp.src(config.js.tests.runner)
    .pipe(mochaPhantomJs());
});

// Collects the various meta-tasks related to the JavaScript build into a
// single task.
gulp.task('js-quality', ['js-lint', 'js-style', 'js-test']);

// Runs the complete suite of JavaScript build tasks.
gulp.task('js', ['js-quality'], function () {
  return gulp.src([config.js.entry])
    .pipe(plumber())
    .pipe(transform(function (filename) {
      return browserify(filename).bundle();
    }))
    .pipe(gulpif(prod, uglify()))
    .pipe(gulp.dest(config.js.dest));
});
