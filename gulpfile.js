const gulp = require('gulp')
const sass = require('gulp-sass')

gulp.task('styles', function () {
  return gulp.src('src/scss/app.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(sass({ "bundleExec": true }))
    .pipe(gulp.dest('src'));
});
gulp.task('watch', function(done) {
  gulp.watch('src/scss/*.scss', ['styles']);
  done();
})
