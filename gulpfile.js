'use strict';

// Required
var gulp = require('gulp');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('gulp-autoprefixer');

// ======================------------------ TASKS

gulp.task('css', function () {
  return gulp.src('./src/assets/css/styles.scss')
      .pipe(sass().on('error', sass.logError))//Convert sass files to css files
      .pipe(autoprefixer())//adds prefix for old browsers
      .pipe(gulp.dest('./dist/assets/css'));
});

//Update css files each time a sass file is modified
gulp.task('csswatch', function () {
  gulp.watch('./src/assets/css/**/*.scss', ['css']);
});



// Defaukt task
gulp.task('default', ['csswatch']);