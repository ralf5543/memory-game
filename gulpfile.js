'use strict';

// Required
var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var responsive = require('gulp-responsive');

// ======================------------------ TASKS

gulp.task('css', function () {
  return gulp.src('./src/assets/css/styles.scss')
      .pipe(sass().on('error', sass.logError))//Convert sass files to css files
      .pipe(autoprefixer())//adds prefix for old browsers
      .pipe(gulp.dest('./dist/assets/css'));
});

//Generates images at different sizes
gulp.task('images', function () {

  return gulp.src('./sources/*.{jpg,png}')
      .pipe(responsive({

        '*': [{
          width: 200,
          height: 200,
          rename: { suffix: '-200px' }
        }, {
          width: 200 * 2,
          height: 200 * 2,
          rename: { suffix: '-200px_2x' }
        }, {
          width: 200 * 3,
          height: 200 * 3,
          rename: { suffix: '-200px_3x' }
        }, {
          width: 300,
          height: 300,
          rename: { suffix: '-300px' }
        }, {
          width: 300 * 2,
          height: 300 * 2,
          rename: { suffix: '-300px_2x' }
        }, {
          width: 300 * 3,
          height: 300 * 3,
          rename: { suffix: '-300px_3x' }
        }, {
          // Compress, strip metadata, and rename original image
          rename: { suffix: '-original' }
        }],
      }, {
        // Global configuration for all images
        // The output quality for JPEG, WebP and TIFF output formats
        quality: 70,
        // Use progressive (interlace) scan for JPEG and PNG output
        progressive: true,
        // Strip all metadata
        withMetadata: false,
        withoutEnlargement: true,
        skipOnEnlargement: true, // that option copy original file with/without renaming
        errorOnEnlargement: false,
        crop: 'center'
      }))
      .pipe(gulp.dest('./dist/assets/img'));
});

//Update css files each time a sass file is modified
gulp.task('csswatch', function () {
  gulp.watch('./src/assets/css/**/*.scss', ['css']);
});



// Defaukt task
gulp.task('default', ['csswatch']);