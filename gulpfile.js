const gulp = require('gulp')
, babel = require('gulp-babel')
, browserify = require('browserify')
, source = require('vinyl-source-stream')
, buffer = require('vinyl-buffer')
;

gulp.task('transpile', () => {
  return gulp.src('./src/**/*.js')
  .pipe(babel({
    presets: ['es2015']
  }))
  .pipe(gulp.dest('./dist'));
});

gulp.task('browserify', () => {
  return  browserify('./public/js/src/container.jsx')
  .transform('babelify', {presets:['es2015', 'react']})
  .bundle()
  .pipe(source('container.js'))
  .pipe(buffer())
  .pipe(gulp.dest('./public/js/dist'));
});

gulp.task('watch', () => {
  gulp.watch('./src/**/*.js', ['transpile']);
  gulp.watch('./public/js/src/**/*.{js,jsx}', ['browserify']);
});

gulp.task('default', ['transpile', 'browserify', 'watch']);
