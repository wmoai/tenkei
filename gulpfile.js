const gulp = require('gulp')
, babel = require('gulp-babel')
;

gulp.task('transpile', () => {
  return gulp.src('./src/**/*.js')
  .pipe(babel({
    presets: ['es2015']
  }))
  .pipe(gulp.dest('./dist'));
});

gulp.task('watch', () => {
  gulp.watch('./src/**/*.js', ['transpile']);
});

gulp.task('default', ['transpile', 'watch']);
