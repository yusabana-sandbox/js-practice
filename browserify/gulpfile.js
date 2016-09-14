var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('scripts', function() {
  return gulp.src([
    './js/foo.js',
    './js/bar.js',
    './js/main.js'
  ]).pipe(concat('all.js'))
    .pipe(gulp.dest('./dist/'));
});
