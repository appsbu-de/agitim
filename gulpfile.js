var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var preprocess = require('gulp-preprocess');
var bower = require('gulp-bower');

var config = {
    src: {
        font:  [
            'vendor/typicons/src/font/typicons.eot',
            'vendor/typicons/src/font/typicons.ttf',
            'vendor/typicons/src/font/typicons.woff',
            'vendor/typicons/src/font/typicons.min.css'
        ],

        brick: [
            'vendor/brick/dist/brick.min.js',
            'vendor/brick/dist/brick.min.css'
        ],

         scripts: [
             'src/polyfills.js',
             'src/timer.js',
             'src/agile.js',
             'src/app.js'
         ],
         javascript: 'src/*.js',

         html: 'public/*.html',

         css: 'public/css/*'
    }
}

gulp.task('clean', function() {
    return gulp.src('dist', {read: false})
        .pipe(clean());
});

gulp.task('bower', function() {
    bower().pipe(gulp.dest('vendor/'))
});

// Lint Task
gulp.task('lint', function() {
    return gulp.src(config.src.javascript)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('brick', ['bower'], function() {
    return gulp.src(config.src.brick)
        .pipe(gulp.dest('dist/vendor/'));
});

gulp.task('fonts', ['bower', 'brick'],  function() {
    return gulp.src(config.src.font)
        .pipe(gulp.dest('dist/vendor/webfonts/'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src(config.src.scripts)
        .pipe(concat('agitim.js'))
        .pipe(gulp.dest('dist/script'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/script'));
});

gulp.task('html-debug', function() {
    return gulp.src(config.src.html)
        .pipe(preprocess({context: {
            'DEBUG': true
        }}))
        .pipe(gulp.dest('dist/'));
});

gulp.task('html', function() {
    return gulp.src(config.src.html)
        .pipe(preprocess({context: {
            'BUILD': true
        }}))
        .pipe(gulp.dest('dist/'));
});

gulp.task('css', function() {
    return gulp.src(config.src.css)
        .pipe(gulp.dest('dist/css/'));
})

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch(config.src.javascript, ['lint', 'scripts']);
    gulp.watch('public/**/*', ['html', 'css']);
});

// Default Task
gulp.task('default', ['clean', 'lint', 'fonts', 'scripts', 'css', 'html-debug', 'watch']);
gulp.task('build', ['clean', 'lint', 'fonts', 'css', 'scripts', 'html']);
