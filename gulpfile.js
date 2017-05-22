var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var imageResize = require('gulp-image-resize');
var sass = require('gulp-sass');

var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');

const Launcher = require('webdriverio/build/lib/launcher');
const path = require('path');
const wdio = new Launcher(path.join(__dirname, 'wdio.conf.js'));
var webdriver = require('gulp-webdriver');

gulp.task('default', ['server'], function () {

});

gulp.task('server', ['sass'], function () {

    gulp.run('lint', 'dist');
    gulp.watch(files, function (evt) {
        gulp.run('lint', 'dist');
    });

    browserSync.init({
        server: {
            baseDir: "./"
        },
        port: process.env.PORT || 5000
    });

    gulp.watch("*.html").on("change", reload);
    gulp.watch("js/*.js").on("change", reload);
    gulp.watch('sass/*.scss', ['sass']).on("change", reload);
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
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(gulp.dest('css'));
});

gulp.task('sass:watch', function () {
    gulp.watch('sass/*.scss', ['sass']);
});

var files = ["js/main.js", "js/*.js"];

gulp.task('lint', function () {

    gulp.src(files)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('dist', function () {

    gulp.src(files)
        .pipe(concat('./dist'))
        .pipe(rename('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist'));
});

gulp.task('e2e', ['server'], () => {
  return wdio.run(code => {
    process.exit(code);
  }, error => {
    console.error('Launcher failed to start the test', error.stacktrace);
    process.exit(1);
  });
});

gulp.task('test', ['e2e'], () => {
  browserSync.exit();
});

gulp.task('test:e2e', function() {
    return gulp.src('wdio.conf.js').pipe(webdriver());
});