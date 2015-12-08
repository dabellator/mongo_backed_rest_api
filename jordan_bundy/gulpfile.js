var gulp = require('gulp');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var webpack = require('webpack-stream');
var concatCss = require('gulp-concat-css');
var minifyCss = require('gulp-minify-css');
var sass = require('gulp-sass');
var maps = require('gulp-sourcemaps');


var appFiles = ['index.js', 'lib/**/*.js'];
var testFiles = ['test/**/*.js'];

gulp.task('jshint:test', function() {
  return gulp.src(testFiles)
    .pipe(jshint({
      node: true,
      globals: {
        describe: true,
        it: true,
        before: true,
        after: true
      }
    }))
    .pipe(jshint.reporter('default'));
});

gulp.task('jshint:app', function() {
  return gulp.src(appFiles)
    .pipe(jshint({
      node: true
    }))
    .pipe(jshint.reporter('default'));
});

gulp.task('mocha:test', function() {
  return gulp.src(testFiles)
    .pipe(mocha({
      read: false,
      reporter: 'nyan'
    }))
    .once('end', function() {
      console.log(process.exit);
    })
});

gulp.task('css:sass', function() {
  return gulp.src('./app/sass/**/*.scss')
  .pipe(maps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(minifyCss())
  .pipe(maps.write('./'))
  .pipe(gulp.dest('build/'))
});

gulp.task('css:watch', function() {
  gulp.watch(['./app/sass/**/*.scss', './app/index.html'], ['css:sass', 'static:dev']);
});

gulp.task('static:dev', function() {
  gulp.src('app/**/*.html')
  .pipe(gulp.dest('build/'));
});

gulp.task('webpack:dev', function() {
  gulp.src('app/js/entry.js')
  .pipe(webpack({
    output: {
      filename: 'bundle.js'
    }
  }))
  .pipe(gulp.dest('build/'));
});

gulp.task('webpack:test', function() {
  return gulp.src('test/client/test_entry.js')
    .pipe(webpack({
      output: {
        filename: 'test_bundle.js'
      }
    }))
    .pipe(gulp.dest('test/client/'));
});

gulp.task('watch', function() {
  gulp.watch(['./**/*', '!./package.json'], ['jshint', 'mocha']);
});

gulp.task('jshint', ['jshint:test', 'jshint:app']);
gulp.task('mocha', ['mocha:test']);
gulp.task('build:dev', ['webpack:dev', 'static:dev']);
gulp.task('default', ['jshint', 'mocha', 'watch', 'build:dev']);

