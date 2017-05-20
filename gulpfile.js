var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var resize = require('gulp-image-resize');

gulp.task('default', function () {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch("index.html").on("change", reload);
    gulp.watch("js/*.js").on("change", reload);

});

gulp.task('img', function () {
    gulp.src('src/img/*.jpg')
        .pipe(resize({
            width: 1500,
            height: 1125,
            crop: true,
            upscale: false
        }))
        .pipe(gulp.dest('img'));
});