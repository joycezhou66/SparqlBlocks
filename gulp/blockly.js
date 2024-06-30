'use strict';

const gulp = require('gulp');
const replace = require('gulp-replace');
const insert = require('gulp-insert');

const blocklyDir = "./blockly";
const mediaDistDir = "./dist/media";

gulp.task('blockly', function() {
  return gulp.src(blocklyDir + "/blockly_compressed.js")
    .pipe(replace(/goog\.global\s*=\s*this;/, 'goog.global=that;'))
    .pipe(insert.wrap(
      'module.exports = (function(){  var that = {}; that.navigator=""; ',
      ' goog.Timer.defaultTimerObject = window; ' +
      ' return Blockly;})()'))
    .pipe(gulp.dest('lib'));
});

gulp.task('blocklyMsgEn', function() {
  return gulp.src(blocklyDir + '/msg/js/en.js')
    .pipe(replace(/goog\.[^\n]+/g, ''))
    .pipe(insert.wrap('var Blockly = {}; Blockly.Msg={};  module.exports = function(){ ', 'return Blockly.Msg;}'))
    .pipe(gulp.dest('lib/i18n/'));
});

gulp.task('blocklyMedia', function() {
  return gulp.src(blocklyDir + '/media/**.*')
    .pipe(gulp.dest(mediaDistDir));
});

gulp.task('buildBlockly', gulp.series('blockly', 'blocklyMsgEn', 'blocklyMedia'));
