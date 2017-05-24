var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var imageResize = require('gulp-image-resize');
var sass = require('gulp-sass');

var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');

var gnf = require('gulp-npm-files');

var webdriver = require('gulp-webdriver');

gulp.task('default', ['server'], function () {

});

gulp.task('server', ['sass'], function () {

    gulp.run('lint', 'dist');
    gulp.watch(files, function (evt) {
        gulp.run('lint', 'dist');
    });

    gulp.src('src/*.html')
        .pipe(gulp.dest('dist'));

    gulp.src('src/img/*.jpg')
        .pipe(gulp.dest('dist/img'));

    gulp.src(gnf(), {
        base: './'
    }).pipe(gulp.dest('./dist'));

    browserSync.init({
        server: {
            baseDir: "./dist"
        },
        port: process.env.PORT || 5000
    });

    gulp.watch("src/*.html").on("change", reload);
    gulp.watch("src/js/*.js").on("change", reload);
    gulp.watch('src/sass/*.scss', ['sass']).on("change", reload);
});

gulp.task('img', function () {
    gulp.src('src/img/uncompressed/*.jpg')
        .pipe(imageResize({
            width: 300,
            height: 225,
            crop: true,
            upscale: false
        }))
        .pipe(gulp.dest('src/img'));
});

gulp.task('sass', function () {
    return gulp.src('src/sass/*.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('sass:watch', function () {
    gulp.watch('src/sass/*.scss', ['sass']);
});

var files = ["src/js/main.js", "src/js/*.js"];

gulp.task('lint', function () {

    gulp.src(files)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('dist', function () {

    gulp.src(files)
        .pipe(concat('dist/js'))
        .pipe(rename('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('server:test', function (done) {
    browserSync.init({
        logLevel: 'silent',
        notify: false,
        open: false,
        server: {
            baseDir: "./dist"
        },
        port: process.env.PORT || 5000,
        ui: false
    }, done);
});

gulp.task('test', ['test:e2e'], () => {
    browserSync.exit();
});

gulp.task('test:e2e', ['server:test'], function () {
    return gulp.src('wdio.conf.js').pipe(webdriver());
});