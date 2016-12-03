'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')();

var wiredep = require('wiredep').stream;

module.exports = function(options) {
  gulp.task('inject', ['webpack', 'styles'], function () {
    var injectStyles = gulp.src([
      options.tmp + '/serve/**/*.css',
      '!' + options.tmp + '/serve/vendor.css'
    ], { read: false });

    var injectScripts = gulp.src([
      options.tmp + '/serve/main.bundle.js',
      '!' + options.src + '/**/*.spec.js',
      '!' + options.src + '/**/*.mock.js'
    ]);

    var injectOptions = {
      ignorePath: [options.src, options.tmp + '/serve'],
      addRootSlash: false
    };

    return gulp.src(options.tmp + '/index.html')
      .pipe($.inject(injectStyles, injectOptions))
      .pipe($.inject(injectScripts, injectOptions))
      .pipe(wiredep(options.wiredep))
      .pipe(gulp.dest(options.tmp + '/serve'));

  });
};
