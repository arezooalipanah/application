const gulp = require('gulp'), 
sass = require('gulp-sass');

// sass
gulp.task('sass', () =>
	gulp.src('sass/main.sass')
		.pipe(sass({style: 'expanded'}))
			.on('error', sass.logError)
		.pipe(gulp.dest('css'))
);

// watch
gulp.task('watch', () => {
	gulp.watch('sass/**/*.sass', ['sass']);
});

// default
gulp.task('default', ['sass', 'watch']);