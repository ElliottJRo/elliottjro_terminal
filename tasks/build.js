'use strict';

var gulp = require('gulp');
var runSquence = require('run-sequence');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'uglify-save-license', 'del']
});

module.exports = function(options) {

  gulp.task('html', ['inject'], function () {

    var htmlFilter = $.filter(['*.html'], {restore: true});
    var jsFilter = $.filter(['**/*.js'], {restore: true});
    var cssFilter = $.filter(['**/*.css'], {restore: true});
    var assets;

    return gulp.src(options.tmp + '/serve/*.html')
      .pipe(assets = $.useref.assets())
      .pipe($.rev())
      .pipe(jsFilter)
      .pipe($.uglify({ preserveComments: $.uglifySaveLicense })).on('error', options.errorHandler('Uglify'))
      .pipe(jsFilter.restore)
      .pipe(cssFilter)
      .pipe($.csso())
      .pipe(cssFilter.restore)
      .pipe(assets.restore())
      .pipe($.useref())
      .pipe($.revReplace())
      .pipe(htmlFilter)
      .pipe($.minifyHtml({
        empty: true,
        spare: true,
        quotes: true,
        conditionals: true
      }))
      .pipe(htmlFilter.restore)
      .pipe(gulp.dest(options.dist + '/'))
      .pipe($.size({ title: options.dist + '/', showFiles: true }));
  });

  gulp.task('assets', function () {
    return gulp.src([
      options.src + '/assets/**/*'
    ])
      .pipe(gulp.dest(options.dist + '/assets'));
  });

  gulp.task('other', function () {
    return gulp.src([
      options.src + '/**/*',
      '!' + options.src + '/**/*.{html,css,js,scss,jade}'
    ])
      .pipe(gulp.dest(options.dist + '/'));
  });

  gulp.task('clean', function (done) {
    return $.del([options.dist + '/', options.tmp + '/'], done);
  });

  gulp.task('build', function(done) {
    return runSquence('html', 'other', 'assets');
  });

  gulp.task('clean-build', function(done) {
    return runSquence('clean', 'build');
  });
};
