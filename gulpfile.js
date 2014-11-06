var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    mocha = require('gulp-mocha'),
    bump = require('gulp-bump');

// JS hint task
gulp.task('jshint', function() {
  gulp.src(['*.js', './client/**/*.js','./test/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('mocha', function () {
  gulp.src('./test/*.js')
    .pipe(mocha({ reporter: 'list' }));
});

gulp.task('bump', function(){
  gulp.src('./package.json')
    .pipe(bump({type:'patch'}))
    .pipe(gulp.dest('./'));
});

gulp.task('build', ['jshint', 'mocha', 'bump']);

gulp.task('test', ['jshint', 'mocha']);