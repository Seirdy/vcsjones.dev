"use strict";
let gulp = require('gulp'),
    exec = require('gulp-exec'),
    cp_exec = require('child_process').exec;

gulp.task('jekyll', (cb) => {
    cp_exec('jekyll build', (err) => {
        cb(err);
    });
});

gulp.task('webp-png', ['jekyll'], () => {
    return gulp.src('./_site/images/**/*.png')
            .pipe(exec('cwebp -lossless "<%= file.path %>" -o "<%= file.path %>.webp"'));
});

gulp.task('webp-jpeg', ['jekyll'], () => {
    const quality = 80;
    return gulp.src(['./_site/images/**/*.jpg', './images/**/*.jpeg'])
            .pipe(exec(`cwebp -q ${quality} "<%= file.path %>" -o "<%= file.path %>.webp"`));
});

gulp.task('default', ['jekyll', 'webp-png', 'webp-jpeg'], () => {});