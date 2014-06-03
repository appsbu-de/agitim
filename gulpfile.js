var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var preprocess = require('gulp-preprocess');
var bower = require('gulp-bower');

gulp.task('clean', function () {
    return gulp.src('dist', {read: false})
        .pipe(clean());
});

gulp.task('bower', function() {
    bower().pipe(gulp.dest('vendor/'))
});

// Lint Task
gulp.task('lint', function () {
    return gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('brick', function() {
   return gulp.src(['vendor/brick/dist/brick.min.js', 'vendor/brick/dist/brick.min.css']).
       pipe(gulp.dest('dist/vendor/'));
});

// Concatenate & Minify JS
gulp.task('scripts', function () {
    return gulp.src(['src/polyfills.js', 'src/timer.js', 'src/agile.js', 'src/app.js'])
        .pipe(concat('agitim.js'))
        .pipe(gulp.dest('dist/script'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/script'));
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

gulp.task('css', function() {
    return gulp.src('public/css/*')
        .pipe(gulp.dest('dist/css/'));
})

// Watch Files For Changes
gulp.task('watch', function () {
    gulp.watch('src/*.js', ['lint', 'scripts']);
    gulp.watch('public/**/*', ['html', 'css']);
});

// Default Task
gulp.task('default', ['clean', 'lint', 'bower', 'brick', 'scripts', 'css', 'html-debug', 'watch']);
gulp.task('build', ['clean', 'lint', 'bower', 'brick', 'css', 'scripts', 'html']);
