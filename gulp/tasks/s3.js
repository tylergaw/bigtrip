'use strict';

// Copies the contents of /dist to the bucket specified Amazon S3 bucket

var gulp = require('gulp'),
  util = require('util'),
  chalk = require('chalk'),
  s3 = require('gulp-s3'),
  config = require('../config'),

  // Logs a "success" message.
  success = function () {
    console.log(chalk.green(util.format.apply(util, arguments)));
  },

  // Logs a "failure" message.
  failure = function () {
    console.log(chalk.red(util.format.apply(util, arguments)));
  };

gulp.task('s3', ['default'], function () {
  var aws = {}, failed;

  // Use the config to create an object for use as params for gulp-s3. Any
  // missing config values or resulting envvars will cause an error.
  ['key', 'secret', 'bucket', 'region'].forEach(function (key) {
    var value = config.deploy.s3[key];
    if (
      config.deploy.s3.hasOwnProperty(key) &&
      typeof value === 'string' &&
      value.length > 0
    ) {
      aws[key] = process.env[value];
      if (aws[key]) {
        success('✓ Required env var %s set', value);
      } else {
        failure('Missing env var: %s', value);
        failed = true;
      }
    } else {
      failure('Missing or bad config.deploy.s3.%s', key);
      failed = true;
    }
  });

  if (!failed) {
    return gulp.src(config.dest + '/**').pipe(s3(aws));
  }
});
