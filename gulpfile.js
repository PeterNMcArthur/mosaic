var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var livereload = require('gulp-livereload');
var jshint = require('gulp-jshint');
var watchify = require('watchify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var assign = require('lodash.assign');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var rename = require('gulp-rename');
var karma = require('karma');
var babelify = require("babelify");


var paths = {
    "javaScript": ['dev/**/*.js'],
    "scss": ['dev/**/*.scss'],
    "html": ['mosaic.html'],
    "tests": ['spec/**/*.js']
}

gulp.task('html', function() {
    return gulp.src(paths.html )
    .pipe(livereload());
});


gulp.task('sass', function () {
    return gulp.src(paths.scss)
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write('./maps'))
    .pipe(rename({
        dirname: './',
    }))
    .pipe(gulp.dest('./css'))
    .pipe(livereload());
});

gulp.task('lint', function () {
        return gulp.src(paths.javaScript)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('karma', function() {
    return gulp.src()
        .pipe(karma({
            configFile: 'karma.conf.js',
            action: 'run'
        }))
        .on('error', function(err) {
            throw err;
        });
});

var startServer = function() {
    var express = require('./server.js');
}

gulp.task('test', function (done) {

    return karma.server.start({
        configFile: __dirname+'/karma.conf.js',
        logLevel: 'LOG_DISABLE',
        singleRun: false
  });
});

var customOpts = {
  entries: ['./dev/app/index.js'],
  debug: true
};
var opts = assign({}, watchify.args, customOpts);
var b = watchify(browserify(opts));

b.transform(babelify.configure({
      extensions: '.js'
    }));

gulp.task('browserify', ['lint'], bundle); // so you can run `gulp js` to build the file
b.on('update', bundle); // on any dep update, runs the bundler
b.on('log', gutil.log); // output build logs to terminal

function bundle() {
  return b.bundle()
    // log errors if they happen
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('./dev/app/index.js'))
    // optional, remove if you don't need to buffer file contents
    .pipe(buffer())
    .pipe(sourcemaps.write('./maps')) // writes .map file
    .pipe(rename({
      dirname: './',
      basename: 'client'
    }))
    .pipe(gulp.dest('./js'))
    .pipe(livereload());
}

gulp.task('watch', function(){
    livereload.listen();
    startServer();
    // gulp.watch([paths.javaScript, paths.tests], ['test']);
    gulp.watch(paths.scss, ['sass']);
    gulp.watch(paths.html, ['html']);
    gulp.watch(paths.javaScript, ['lint', 'browserify']);
})
