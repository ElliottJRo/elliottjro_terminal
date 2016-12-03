'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var browserSyncSpa = require('browser-sync-spa');
var runSquence = require('run-sequence');
var util = require('util');

var middleware = require('./proxy');
var php = require('gulp-connect-php');


module.exports = function(options) {

  /**
   * Starts a browser sync server AND a PHP server so we can handle
   *  php stuff without manually starting it ourselves
   */
  function browserSyncInit(baseDir, browser) {
    browser = browser === undefined ? 'default' : browser;

    var routes = null;
    if(baseDir === options.src || (util.isArray(baseDir) && baseDir.indexOf(options.src) !== -1)) {
      routes = {
        '/bower_components': 'bower_components'
      };
    }

    var server = {
      baseDir: baseDir,
      routes: routes
    };

    if(middleware().length > 0) {
      server.middleware = middleware();
    }

    browserSync.instance = browserSync.init({
      startPath: '/',
      server: server,
      browser: browser,
      notify: false
    });

    console.log('Starting PHP server listening on port 3010');
    php.server({ base: options.src, port: 3010, open: false, keepalive: true});
  }

  gulp.task('serve', function () {
    runSquence('clean', 'watch', function() {
      return browserSyncInit([options.tmp + '/serve', options.src]);
    });
  });

  gulp.task('serve:dist', ['build'], function () {
    browserSyncInit(options.dist);
  });

};
