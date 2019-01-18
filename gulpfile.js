'user strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const debug = require('gulp-debug');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const path = require('path');
const newer = require('gulp-newer');
const imagemin = require('gulp-imagemin');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();

sass.compiler = require('node-sass');

const srcDir = 'source';
const destDir = 'dest';

gulp.task('html', function() {
    return gulp.src(srcDir + '/index.html', {since: gulp.lastRun('html')})
        .pipe(newer(destDir))
        .pipe(gulp.dest(destDir))
});

gulp.task('styles', function() {
    return gulp.src(srcDir + '/scss/app.scss', {since: gulp.lastRun('styles')})
        .pipe(gulp.dest(destDir + '/css'))
        .pipe(sourcemaps.init())
        .pipe(autoprefixer())
        .pipe(sass.sync({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(destDir + '/css'));
});

gulp.task('js', function() {
    return gulp.src(srcDir + '/js/app.js', {since: gulp.lastRun('js')})
        .pipe(newer(destDir + '/js'))
        .pipe(gulp.dest(destDir + '/js'))
});

gulp.task('img', function() {
    return gulp.src(srcDir + '/img/**/*.*', {since: gulp.lastRun('img')})
        .pipe(newer(destDir + '/img'))
        .pipe(imagemin())
        .pipe(gulp.dest(destDir + '/img'))
});

gulp.task('build', gulp.parallel('html', 'styles', 'js', 'img'));

gulp.task('watch', function () {
    gulp.watch(srcDir + '/**/*.*', gulp.series('html', 'styles', 'js', 'img')).on('unlink', function (filepath) {
        const filePathFromSrc = path.relative(path.resolve(srcDir), filepath);
        const destFilePath = path.resolve(destDir, filePathFromSrc);
        del.sync(destFilePath);
    });
});

gulp.task('serv', function () {
    browserSync.init({
        server: 'dest'
    });

    browserSync.watch('dist/**/*.*').on('change', browserSync.reload);
});

gulp.task('dev', gulp.series('build', gulp.parallel('watch', 'serv')));
