'use strict';


// ---------------------------------
// Dependencies
// ---------------------------------

var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var sassdoc = require('sassdoc');


// ---------------------------------
// Configuration
// ---------------------------------
var input = './app/sass/**/*.scss';
var output = './dist/css';
var sassOptions = { outputStyle: 'expanded' };
var autoprefixerOptions = { browsers: ['last 2 versions', '> 5%', 'Firefox ESR'] };
var sassdocOptions = { dest: './public/sassdoc' };


// ---------------------------------
// Sass compilation
// ---------------------------------

gulp.task('sass', function () {
  return gulp
    .src(input)
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(output));
});

// ---------------------------------
// Sass documentation generation
// ---------------------------------

gulp.task('sassdoc', function () {
  return gulp
    .src(input)
    .pipe(sassdoc(sassdocOptions))
    .resume();
});

// ---------------------------------
// Watchers
// ---------------------------------

gulp.task('watch', function() {
  return gulp
    .watch(input, ['sass'])
    .on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});


// ---------------------------------
// Production build
// ---------------------------------

gulp.task('prod', ['sassdoc'], function () {
  return gulp
    .src(input)
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(gulp.dest(output));
});


// ---------------------------------
// Default task
// ---------------------------------

gulp.task('default', ['sass', 'watch']);