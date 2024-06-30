var gulp = require('gulp'),
    xslt = require('gulp-xslt');

gulp.task('makePage', function() {
  return gulp.src('./src/page/index.html')
    .pipe(xslt('mainPage.xslt'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('makePage-bundleAll', function() {
  return gulp.src('./src/page/index.html')
    .pipe(xslt('mainPage.xslt', { bundledLibs: 'false'}))
    .pipe(gulp.dest('./dist/'));
});