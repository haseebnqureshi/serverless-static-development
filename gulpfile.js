var gulp = require('gulp');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var minify = require('gulp-minify');
var rename = require('gulp-rename');

gulp.task('lint', function() {
	return gulp.src('www/js/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

gulp.task('sass', function() {
	return gulp.src('www/scss/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('www/css'));
});

gulp.task('scripts', function() {
	return gulp.src('www/js/*.js')
		.pipe(concat('bundle.js'))
		.pipe(gulp.dest('www/dist/js'))
		.pipe(minify({
			ext: {
				 min: '.min.js'
			}
		}))
		.pipe(gulp.dest('www/dist/js'));
});

gulp.task('stylesheets', function() {
	return gulp.src('www/css/*.css')
		.pipe(concat('bundle.css'))
		.pipe(gulp.dest('www/dist/css'))
		.pipe(rename('bundle.min.css'))
		.pipe(minify())
		.pipe(gulp.dest('www/dist/css'));
});

gulp.task('watch', function() {
	gulp.watch('www/js/*.js', ['scripts']);
	gulp.watch('www/scss/*.scss', ['sass']);
	gulp.watch('www/css/*.css', ['stylesheets']);
});

gulp.task('default', ['sass', 'scripts', 'stylesheets', 'watch']);

//now running our express server
var express = require('express');
var app = express();
app.use(express.static(__dirname + '/www'));
app.listen(3000);
