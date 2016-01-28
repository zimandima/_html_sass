var gulp = require('gulp'),
	rename = require("gulp-rename"),
	notify = require("gulp-notify"),
	autoprefixer = require('gulp-autoprefixer'),
	livereload = require('gulp-livereload'),
	connect = require('gulp-connect'),
	sass = require('gulp-sass'),
	minifyCss = require('gulp-minify-css');

//server connect
gulp.task('connect', function() {
  connect.server({
    root: 'app',
    livereload: true
  });
});

//css
gulp.task('sass', function() {
	gulp.src('sass/*.sass')
	.pipe(sass())
	.pipe(autoprefixer('last 5 version'))
	.pipe(minifyCss(''))
	.pipe(rename({suffix: '.min', prefix : ''}))
	.pipe(gulp.dest('app/css'))
	.pipe(notify("Done!"))
	.pipe(connect.reload());
});

//html
gulp.task('html', function(){
	gulp.src('app/*.html')
	.pipe(connect.reload());
})

//js
gulp.task('js', function(){
	gulp.src('app/js/*.js')
	.pipe(connect.reload());
})

//watch
gulp.task('watch', function(){
	gulp.watch('sass/*.sass', ['sass'])
	gulp.watch('app/*.html', ['html'])
	gulp.watch('app/js/*js', ['js'])
})

//default
gulp.task('default', ['connect', 'html', 'sass', 'js', 'watch']);
