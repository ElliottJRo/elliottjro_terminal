'use strict';

var gulp = require('gulp');
var pug = require('gulp-pug');
var $ = require('gulp-load-plugins')();

module.exports = function(options) {
  gulp.task('partials', function () {

    return gulp.src([
      options.src + '/index.pug'
    ])
    .pipe(pug()).on('error', options.errorHandler('Pug'))
    .pipe(gulp.dest(options.tmp));

  });

}
