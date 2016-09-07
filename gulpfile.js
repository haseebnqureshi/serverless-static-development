
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
var exec = require('child_process').execSync;
var port = 3000;

/*
Paths
*/

var paths = {
	index: __dirname + '/frontend',
	src: {
		js: __dirname + '/frontend/js/*.js',
		css: __dirname + '/frontend/css/*.css',
		scss: __dirname + '/frontend/scss/*.scss',
		images: __dirname + '/frontend/images/*',
		fonts: __dirname + '/frontend/fonts/*'
	},
	js: __dirname + '/frontend/js',
	css: __dirname + '/frontend/css',
	scss: __dirname + '/frontend/scss',
	images: __dirname + '/frontend/images',
	fonts: __dirname + '/frontend/fonts',
	dist: {
		index: __dirname + '/www',
		js: __dirname + '/www/js',
		css: __dirname + '/www/css',
		images: __dirname + '/www/images',
		fonts: __dirname + '/www/fonts'
	},
	views: {
		index: __dirname + '/frontend/views',
		all: __dirname + '/frontend/views/*',
		partials: __dirname + '/frontend/views/partials/*'
	} 
}

/*
Gulp Tasks
*/

gulp.task('lint', function() {
	return gulp.src(paths.src.js)
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

gulp.task('sass', function() {
	return gulp.src(paths.src.scss)
		.pipe(sass())
		.pipe(gulp.dest(paths.css));
});

gulp.task('scripts', function() {
	return gulp.src(paths.src.js)
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
	return gulp.src(paths.src.css)
		.pipe(concat('bundle.css'))
		.pipe(gulp.dest(paths.dist.css));
});

gulp.task('images', function() {
	return gulp.src(paths.src.images)
		.pipe(gulp.dest(paths.dist.images));
});

gulp.task('fonts', function() {
	return gulp.src(paths.src.fonts)
		.pipe(gulp.dest(paths.dist.fonts));
});

gulp.task('views', shell.task([
	'pug ' + paths.views.index + ' --pretty --out ' + paths.dist.index
]));

gulp.task('watch', function() {
	gulp.watch(paths.src.fonts, ['fonts']);
	gulp.watch(paths.src.images, ['images']);
	gulp.watch(paths.src.js, ['scripts']);
	gulp.watch(paths.src.scss, ['sass']);
	gulp.watch(paths.src.css, ['stylesheets']);
	gulp.watch(paths.views.all, ['views']);
	gulp.watch(paths.views.partials, ['views']);
});

gulp.task('render', ['sass', 'scripts', 'stylesheets', 'views', 'images', 'fonts']);

gulp.task('default', ['render', 'watch']);

gulp.task('start', ['default'], function() {
	exec(`open http://localhost:${port}/`);
});

/*
Express Serving Static Files
*/

var express = require('express');
var app = express();
app.use(express.static(paths.dist.index));
app.listen(port);
