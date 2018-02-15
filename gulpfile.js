var gulp = require('gulp');
var minifyCss = require('gulp-minify-css');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var gulpIf = require('gulp-if');
var notify = require('gulp-notify');

var isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'dev';

var paths = {
  css:['main.css'],
  scss:['dev/scss/*.scss']
};

gulp.task('mincss', function(){
  return gulp.src('main.css')
    .pipe(minifyCss())
    .pipe(gulp.dest('css'));
});

gulp.task('minscss', function(){
 return gulp.src(paths.scss)
   .pipe(gulpIf(isDevelopment, sourcemaps.init()))
   .pipe(sass().on('error', sass.logError))
   .pipe(minifyCss())
   .pipe(gulpIf(isDevelopment, sourcemaps.write()))
   .pipe(notify('BUILD!'))
   .pipe(gulp.dest('prod/css'));
});

gulp.task('watcher',function(){
  gulp.watch(paths.scss, ['minscss']);
});

gulp.task('default', ['watcher', 'minscss']);