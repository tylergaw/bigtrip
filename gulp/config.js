'use strict';

// Where dist, gulp, src, and tests live relative to gulpfile.js
var root = '.',
  dest = root + '/dist',
  gulp = root + '/gulp',
  src = root + '/src',
  tests = root + '/tests';

module.exports = {

  src: src,
  dest: dest,

  js: {
    src: src + '/js/**/*.js',
    dest: dest + '/js',
    entry: src + '/js/app.js',
    tasks: gulp + '/tasks/*.js',
    tests: {
      src: tests + '/src/**/*.js',
      dest: tests + '/dist',
      entry: tests + '/src/entry.js',
      runner: tests + '/runner.html'
    }
  },

  scss: {
    src: src + '/scss/**/*.scss',
    dest: dest + '/css',
    lint: gulp + '/scss-lint-config.yml'
  },

  assets: {
    fonts: {
      src: src + '/fonts/**/*.{eot,otf,svg,ttf,woff}',
      dest: dest + '/fonts'
    },

    images: {
      src: src + '/img/**/*.{gif,jpeg,jpg,png}',
      dest: dest + '/img',

// Configure output image sizes here. Each key will be used as a suffix for the
// generated images (e.g., 'my-image-foo.jpg') as well as a generated task name
// (e.g., 'assets-images-foo') and each value will be used as options within the
// task for 'gulp-image-resize'.

      sizes: {
        desktop: {
          height: 1680,
          width: 1680
        },
        phone: {
          height: 480,
          width: 480
        },
        'phone-2x': {
          height: 960,
          width: 960
        },
        tablet: {
          height: 1024,
          width: 1024
        },
        thumb: {
          crop: true,
          height: 100,
          width: 100
        }
      }
    }
  },

  deploy: {

// Configure deployment-related environment variables for static sites on S3.

    s3: {
      key: 'GW_AWS_ACCESS_KEY_ID',
      secret: 'GW_AWS_SECRET_ACCESS_KEY',
      bucket: 'GW_S3_BUCKET',
      region: 'GW_S3_REGION'
    }
  }
};
