'use stict';
var util = require('util'),
    fs = require('fs'),
    gulp = require('gulp'),
    connect = require('gulp-connect'),
    rimraf = require('rimraf'),
    revision = require('git-rev'),
    mocha = require('gulp-mocha'),
    shell = require('gulp-shell'),
    jshint = require('gulp-jshint'),
    istanbul = require('gulp-istanbul'),
    stylish = require('jshint-stylish'),
    istanbulReport = require('gulp-istanbul-report');

var coverageFile = './coverage/coverage-final.json';

var buildMethods = {
  jswatch:function(){
    gulp.src('./lib/**/*.js')
      .pipe(connect.reload());
  },
  version:function(cb) {
    revision.long(function(rev){
      var versionInfo = util.format('%s || %s', require('./package.json').version, rev);
      fs.writeFile('api-dist/version.html', versionInfo, cb);
    });
  },
  pretest:function() {
    return gulp.src('./lib/**/*.js')
      // Right there
      .pipe(jshint())
      .pipe(jshint.reporter(stylish))
      .pipe(istanbul({includeUntested: true}))
      .pipe(istanbul.hookRequire());
  },
  test:function () {
    gulp.src('./tests/**/*.js')
      .pipe(jshint())
      .pipe(jshint.reporter(stylish))
      .pipe(mocha())
      .pipe(istanbul.writeReports({
        dir: './coverage',
        reporters: [ 'lcov', 'text-summary', 'json' ],
        reportOpts: {
          lcov: { dir: './coverage', file: './coverage/lcov.info'},
          json: { dir: './coverage', file: './coverage.json'}
        }
      }));

  },
  cleanCoverage:function(cb){
    rimraf('./coverage', cb);
  }
};

gulp.task('connect', function() {
  return connect.server({
    root: './server.js',
    livereload: true
  });
});


/* Test methods */
// clean coverage folder
gulp.task('cleanCoverage', buildMethods.cleanCoverage);

// pretest
gulp.task('pre-test', buildMethods.pretest);

// run tests
gulp.task('utest', ['cleanCoverage','pre-test'], buildMethods.test);
/* end test methods */

/* Build methods*/

gulp.task('version', buildMethods.version);

// `gulp watch` to develop a remotely-hosted build
gulp.task('watch', function() {
  gulp.watch(['server.js', './lib/**/*.js'], buildMethods.jswatch);
});

gulp.task('host', ['watch', 'connect']);

// build dist
gulp.task('default', ['jspm-bundle', 'version'],function(){
  process.exit(0);
});
// develop a locally-hosted build

// build dist for production
gulp.task('package', ['jspm-bundle-min','version'], function(){
  process.exit(0);
});
