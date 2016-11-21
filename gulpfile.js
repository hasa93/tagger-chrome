var gulp = require('gulp');
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');
var csslint = require('gulp-csslint');
var tinylr = require('tiny-lr');

gulp.task('default',['watch']);

gulp.task('watch', function(){
	gulp.watch("./js/**/*.js", ['jshint']);
});

gulp.task('jshint', function(){
	return gulp.src("./js/**/*.js")
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('csslint', function(){
	return gulp.src("style/style.css")
		.pipe(csslint())
		.pipe(csslint.formatter(require('csslint-stylish')));
});

gulp.task('livereload', function(){
	var lr = tinylr();
	lr.listen(35729);

	gulp.watch(['**.{html,css,js}'], function(evt){
		lr.changed({
			body:{
				files: [evt.path]
			}
		});
	});
});