var gulp = require('gulp'),
    sass = require('gulp-dart-sass');

var config = {
  sassPath: './resources/scss',
  nodeDir: './node_modules',
  flaticonDir: './resources/flaticon',
  cssDistDir: './dist/css'
};

gulp.task('octicons', function() {
  return gulp.src(config.nodeDir + '/octicons/octicons/@(*.eot|*.svg|*.ttf|*.woff)')
    .pipe(gulp.dest(config.cssDistDir + '/fonts'));
});

gulp.task('flaticon', function() {
  return gulp.src(config.flaticonDir + '/**.*')
    .pipe(gulp.dest(config.cssDistDir + '/fonts'));
});

gulp.task('icons', gulp.series('flaticon', 'octicons'));

gulp.task('css', function() {
  return sass(config.sassPath + '/style.scss', {
    outputStyle: 'compressed',
    includePaths: [
      config.sassPath,
      config.nodeDir
    ]
  }).on("error", function (error) {
    console.error("Error: " + error.message);
  }).pipe(gulp.dest(config.cssDistDir));
});

gulp.task('watch-style', function() {
  gulp.watch(config.sassPath + '/**/*.scss', gulp.series('css'));
  gulp.watch(config.flaticonDir + '/**/*.*', gulp.series('flaticon'));
});

gulp.task('makeStyle', gulp.series('icons', 'css'));