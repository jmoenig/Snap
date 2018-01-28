const gulp = require('gulp');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const uglify = require('gulp-uglify');

const config = {
    html: {
        src: 'snap.html',
        dest: '.',
    },
    js: {
        src: [
            'morphic.js',
            'locale.js',
            'widgets.js',
            'blocks.js',
            'threads.js',
            'objects.js',
            'gui.js',
            'paint.js',
            'lists.js',
            'byob.js',
            'tables.js',
            'symbols.js',
            'xml.js',
            'store.js',
            'cloud.js',
            'sha512.js',
        ],
        dest: 'dist',
    },
};

function html() {
    return gulp
        .src(config.html.src + '.tpl')
        .pipe(replace('${VERSION}', (new Date()).getTime()))
        .pipe(rename(config.html.src))
        .pipe(gulp.dest(config.html.dest));
}

function js() {
    return gulp
        .src(config.js.src)
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(rename('app.min.js'))
        .pipe(gulp.dest(config.js.dest));
}

exports.all = gulp.parallel(html, js);
exports.html = html;
exports.js = js;
