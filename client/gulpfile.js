const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;

gulp.task('styles', () => {
   return gulp.src('./client/src/styles/style.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
      .pipe(concat('style.css'))
      .pipe(gulp.dest('./client/public/styles'))
      .pipe(reload({ stream: true }));
});

gulp.task('scripts', () => {
   return gulp.src('./client/src/scripts/script.js')
      .pipe(babel({
         presets: ['env']
      }))
      .pipe(concat('main.js'))
      .pipe(gulp.dest('./client/public/scripts'))
      .pipe(reload({ stream: true }));
});

gulp.task('bs', () => {
   browserSync.init({
      server: '.'
   });
});

gulp.task('default', ['styles', 'scripts', 'bs'], () => {
   gulp.watch('./client/**/*.scss', ['styles']);
   gulp.watch('./client/**/*.js', ['scripts']);
   gulp.watch('*.html', reload);
});