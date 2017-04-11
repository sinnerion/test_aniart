'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const plumber = require('gulp-plumber');
const cache = require('gulp-cache');
const rename = require('gulp-rename');
const htmlmin = require('gulp-htmlmin');
const cleanCss = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const pngout = require('imagemin-pngout');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync');
const rsync = require('gulp-rsync');

gulp.task('b-sync', function () {
  browserSync({
    server: {
      baseDir: './',
    },
    notify: false,
  });
});

gulp.task('sass', function () {
  return gulp.src('src/sass/**/*.scss')
    .pipe(autoprefixer(['last 10 versions']))
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest('dist/css'))
    .pipe(gulp.dest('css'))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('vendor:js', function () {
  return gulp.src([
    './node_modules/jquery/dist/jquery.min.js',
    './node_modules/bootstrap-sass/assets/javascripts/bootstrap.min.js'
  ])
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(gulp.dest('js'));
});

gulp.task('app:js', function () {
  return gulp.src('src/js/*.js')
      .pipe(gulp.dest('dist/js'))
      .pipe(gulp.dest('js'));
});

gulp.task('html-minify', function () {
  return gulp.src('./*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist'));
});

gulp.task('css-minify', function () {
  return gulp.src('dist/css/*.css')
    .pipe(cleanCss({ compatibility: 'ie8' }))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('images:min', function () {
  return gulp.src('src/img/**/*')
    .pipe(cache(imagemin({
      interlaced: true,
      progressive: true,
      svgoPlugins: [{ removeViewBox: false }],
      use: [pngout()],
    })))
    .pipe(gulp.dest('dist/img'));
});

gulp.task('images:copy', function () {
  return gulp.src('src/img/**/*')
      .pipe(gulp.dest('dist/img'))
      .pipe(gulp.dest('img'));
});

gulp.task('compress', function () {
  return gulp.src(['dist/js/common.js', 'dist/js/vendor.js'])
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('fonts', function () {
  return gulp.src('src/fonts/**/*').pipe(gulp.dest('dist/fonts'));
});

gulp.task('watch', ['images:copy', 'fonts', 'sass', 'vendor:js', 'app:js', 'b-sync'], function () {
  gulp.watch('src/sass/**/*.scss', ['sass']);
  gulp.watch('./*.html', browserSync.reload);
  gulp.watch('src/js/**/*.js', browserSync.reload);
});

gulp.task('build', ['clearcache', 'html-minify', 'images:min', 'css-minify']);

gulp.task('clearcache', function () {
  return cache.clearAll();
});

gulp.task('default', ['watch']);
