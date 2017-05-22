var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var imageResize = require('gulp-image-resize');
var sass = require('gulp-sass');

gulp.task('default', ['server'], function () {

});

gulp.task('server', ['sass'], function () {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        port: process.env.PORT || 5000
    });

    gulp.watch("*.html").on("change", reload);
    gulp.watch("js/*.js").on("change", reload);
    gulp.watch('sass/*.scss').on("change", reload);
});

gulp.task('img', function () {
    gulp.src('src/img/*.jpg')
        .pipe(imageResize({
            width: 300,
            height: 225,
            crop: true,
            upscale: false
        }))
        .pipe(gulp.dest('img'));
});

gulp.task('sass', function () {
    return gulp.src('sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('css'));
});

gulp.task('sass:watch', function () {
    gulp.watch('sass/*.scss', ['sass']);
});