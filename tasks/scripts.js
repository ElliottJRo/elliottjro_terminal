'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var babel = require('gulp-babel');
var webpack = require('webpack-stream');

var $ = require('gulp-load-plugins')();

module.exports = function(options) {
  gulp.task('scripts', function () {
    return gulp.src(options.src + '/**/*.js')
      .pipe($.jshint())
      .pipe(babel()).on('error', options.errorHandler('Babel'))
      .pipe($.jshint.reporter('jshint-stylish'))
      .pipe(gulp.dest(options.tmp + '/scripts'));
    });

    gulp.task('webpack', ['scripts'], function() {
      return gulp.src(options.tmp + '/scripts/**/*.js')
        .pipe(webpack(require('./webpack.config.js')(options)))
        .pipe(gulp.dest(options.tmp + '/serve'))
    });

};
