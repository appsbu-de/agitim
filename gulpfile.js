var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var preprocess = require('gulp-preprocess');

gulp.task('clean', function () {
    return gulp.src('dist', {read: false})
        .pipe(clean());
});

// Lint Task
gulp.task('lint', function () {
    return gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Concatenate & Minify JS
gulp.task('scripts', function () {
    return gulp.src(['src/polyfills.js', 'src/timer.js', 'src/agile.js'])
        .pipe(concat('agitim.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

gulp.task('html-debug', function () {
    return gulp.src('public/*.html')
        .pipe(preprocess({context: {
            'DEBUG': true
        }}))
        .pipe(gulp.dest('dist/'));
});

gulp.task('html', function () {
    return gulp.src('public/*.html')
        .pipe(preprocess({context: {
            'BUILD': true
        }}))
        .pipe(gulp.dest('dist/'));
});

// Watch Files For Changes
gulp.task('watch', function () {
    gulp.watch('src/*.js', ['lint', 'scripts']);
    gulp.watch('public/**/*', ['html']);
});

// Default Task
gulp.task('default', ['clean', 'lint', 'scripts', 'html-debug', 'watch']);
gulp.task('build', ['clean', 'lint', 'scripts', 'html']);