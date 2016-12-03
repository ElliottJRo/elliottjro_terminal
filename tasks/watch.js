'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var runSequence = require('run-sequence');

function isOnlyChange(event) {
  return event.type === 'changed';
}

module.exports = function(options) {
  gulp.task('watch', ['partials', 'inject'], function () {

    gulp.watch([
      options.src + '/**/*.css',
      options.src + '/**/*.scss'
    ], function(event) {
      if(isOnlyChange(event)) {
        gulp.start('styles');
      } else {
        gulp.start('inject');
      }
    });

    // gulp.watch([options.src + '/*.php'], function(event) {
    //   browserSync.reload(event.path);
    // });

    gulp.watch(options.src + '/**/*.js', function(event) {
      if(isOnlyChange(event)) {
        runSequence('webpack', function() {
          console.log('reload');
          browserSync.reload(event.path);
        });
      } else {
        runSequence('inject', function() {
          console.log('reload');
          browserSync.reload(event.path);
        });
      }
    });

    gulp.watch(options.src + '/**/*.pug', function(event) {
      runSequence('partials', 'inject', function() {
        browserSync.reload(event.path);
      });
    });

    gulp.watch(options.src + '/assets/**/*', function(event) {
      gulp.start('assets');
      browserSync.reload(event.path);
    });

  });
};
