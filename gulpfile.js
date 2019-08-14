'use strict';

const glob          =   require('glob'),
  gulp              =   require('gulp'),
  gulpSass          =   require('gulp-sass'),
  gulpSassLint      =   require('gulp-sass-lint'),
  gulpSassGlob      =   require('gulp-sass-glob'),
  gulpCleanCSS      =   require('gulp-clean-css'),
  gulpRename        =   require('gulp-rename'),
  gulpNotify        =   require('gulp-notify'),
  gulpSourcemaps    =   require('gulp-sourcemaps'),
  gulpMinify        =   require('gulp-minify'),
  gulpBless         =   require('gulp-bless');

  gulp.task("styles", function() {
    return gulp.src("./assets/sass/main.scss")
      .pipe(gulpSourcemaps.init())
      .pipe(gulpSassGlob())
      .pipe(gulpSass().on('error', gulpSass.logError))
      .pipe(gulpBless())
      .pipe(gulpCleanCSS())
      .pipe(gulpSourcemaps.write("/maps"))
      .pipe(gulpNotify(`Styles task complete`))
      .pipe(gulp.dest("./assets/css"));
  });
  gulp.task('default', gulp.series("styles"));
