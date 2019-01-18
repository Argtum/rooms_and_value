'user strict';

const gulp = require('gulp');
const sass = require('gulp-sass');

sass.compiler = require('node-sass');

gulp.task('sass', function(){
    return gulp.src('source/scss/**/*.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest('dest/css'));
});

gulp.task('watch', function () {
    gulp.watch('source/scss/**/*.scss', gulp.series('sass'));
});
