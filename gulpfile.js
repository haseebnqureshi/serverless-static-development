
/*
Dependencies
*/

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var minify = require('gulp-minify');
var rename = require('gulp-rename');
var shell = require('gulp-shell');

/*
Paths
*/

var paths = {
	index: __dirname + '/frontend',
	js: __dirname + '/frontend/js/*.js',
	css: __dirname + '/frontend/css/*.css',
	scss: __dirname + '/frontend/scss/*.scss',
	images: __dirname + '/frontend/images/*',
	dist: {
		index: __dirname + '/www',
		js: __dirname + '/www/js',
		css: __dirname + '/www/css',
		images: __dirname + '/www/images'
	},
	views: {
		index: __dirname + '/frontend/views',
		all: __dirname + '/frontend/views/*'
	} 
}

/*
Gulp Tasks
*/

gulp.task('lint', function() {
	return gulp.src(paths.js)
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

gulp.task('sass', function() {
	return gulp.src(paths.scss)
		.pipe(sass())
		.pipe(gulp.dest(paths.css));
});

gulp.task('scripts', function() {
	return gulp.src(paths.js)
		.pipe(concat('bundle.js'))
		.pipe(gulp.dest(paths.dist.js))
		.pipe(minify({
			ext: {
				 min: '.min.js'
			}
		}))
		.pipe(gulp.dest(paths.dist.js));
});

gulp.task('stylesheets', function() {
	return gulp.src(paths.css)
		.pipe(concat('bundle.css'))
		.pipe(gulp.dest(paths.dist.css))
		.pipe(rename('bundle.min.css'))
		.pipe(minify())
		.pipe(gulp.dest(paths.dist.css));
});

gulp.task('images', function() {
	return gulp.src(paths.images)
		.pipe(gulp.dest(paths.dist.images));
});

gulp.task('views', shell.task([
	'pug ' + paths.views.index + ' --pretty --out ' + paths.dist.index
]));

gulp.task('watch', function() {
	gulp.watch(paths.images, ['images']);
	gulp.watch(paths.js, ['scripts']);
	gulp.watch(paths.scss, ['sass']);
	gulp.watch(paths.css, ['stylesheets']);
	gulp.watch(paths.views.all, ['views']);
});

gulp.task('default', ['sass', 'scripts', 'stylesheets', 'views', 'watch']);

/*
Express Serving Static Files
*/

var express = require('express');
var app = express();
app.use(express.static(paths.dist.index));
app.listen(3000);
