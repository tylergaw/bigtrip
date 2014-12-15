'use strict';

// Tasks related to stylesheet compilation and quality.

var gulp = require('gulp'),
  sass = require('gulp-sass'),
  plumber = require('gulp-plumber'),
  postcss = require('gulp-postcss'),
  autoprefixer = require('autoprefixer-core'),
  scsslint = require('gulp-scss-lint'),
  cache = require('gulp-cached'),
  config = require('../config'),
  chalk = require('chalk'),
  util = require('util');

function reporter(file) {
  var issues;
  if (!file.scsslint.success) {
    issues = file.scsslint.issues;
    console.log(chalk.red(util.format(
      '%d scss-lint issues in %s',
      issues.length,
      file.path.replace(process.cwd(), '')
    )));
    issues.forEach(function (issue) {
      console.log(chalk.yellow(util.format(
        '  line %s, col %s: %s',
        issue.line,
        issue.column,
        issue.reason
      )));
    });
  }
}

gulp.task('scss-lint', function () {
  return gulp.src(config.scss.src)
    .pipe(cache('scsslint'))
    .pipe(scsslint({
      maxBuffer: 307200,
      config: config.scss.lint,
      reporterOutput: 'scssReport.xml',
      customReport: reporter
    }));
});

gulp.task('scss', ['scss-lint'], function () {
  return gulp.src(config.scss.src)
    .pipe(plumber())
    .pipe(sass({
      sourceMap: false,
      outputStyle: 'compressed'
    }))
    .pipe(postcss([autoprefixer]))
    .pipe(gulp.dest(config.scss.dest));
});
