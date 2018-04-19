const concat = require('gulp-concat'),
    gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),
    jshint = require('gulp-jshint'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify');

let src = [
        'node_modules/morphic-gui/src/settings.js',
        'node_modules/morphic-gui/src/functions.js',
        'node_modules/morphic-gui/src/retina.js',
        'node_modules/morphic-gui/src/animations.js',
        'node_modules/morphic-gui/src/colors.js',
        'node_modules/morphic-gui/src/points.js',
        'node_modules/morphic-gui/src/rectangle.js',
        'node_modules/morphic-gui/src/node.js',
        'node_modules/morphic-gui/src/morphs/morph.js',
        'node_modules/morphic-gui/src/morphs/pen.js',
        'node_modules/morphic-gui/src/morphs/colorpalette.js',
        'node_modules/morphic-gui/src/morphs/graypalette.js',
        'node_modules/morphic-gui/src/morphs/colorpicker.js',
        'node_modules/morphic-gui/src/morphs/blinker.js',
        'node_modules/morphic-gui/src/morphs/cursor.js',
        'node_modules/morphic-gui/src/morphs/box.js',
        'node_modules/morphic-gui/src/morphs/speechbubble.js',
        'node_modules/morphic-gui/src/morphs/dial.js',
        'node_modules/morphic-gui/src/morphs/circlebox.js',
        'node_modules/morphic-gui/src/morphs/sliderbutton.js',
        'node_modules/morphic-gui/src/morphs/slider.js',
        'node_modules/morphic-gui/src/morphs/mousesensor.js',
        'node_modules/morphic-gui/src/morphs/inspector.js',
        'node_modules/morphic-gui/src/morphs/menu.js',
        'node_modules/morphic-gui/src/morphs/string.js',
        'node_modules/morphic-gui/src/morphs/text.js',
        'node_modules/morphic-gui/src/morphs/trigger.js',
        'node_modules/morphic-gui/src/morphs/menuitem.js',
        'node_modules/morphic-gui/src/morphs/frame.js',
        'node_modules/morphic-gui/src/morphs/scrollframe.js',
        'node_modules/morphic-gui/src/morphs/list.js',
        'node_modules/morphic-gui/src/morphs/stringfield.js',
        'node_modules/morphic-gui/src/morphs/bouncer.js',
        'node_modules/morphic-gui/src/morphs/hand.js',
        'node_modules/morphic-gui/src/morphs/world.js',

        'src/widgets.js',
        'src/blocks.js',
        'src/threads.js',
        'src/objects.js',
        'src/gui.js',
        'src/paint.js',
        'src/lists.js',
        'src/byob.js',
        'src/tables.js',
        'src/symbols.js',
        'src/vectorPaint.js',
        'src/xml.js',
        'src/store.js',
        /*'src/locale.js',*/
        'src/cloud.js',
        'src/sha512.js',

        'node_modules/file-saver/FileSaver.min.js'
    ],
    out = 'dist/';

gulp.task('scripts', function () {
    return gulp.src(src)
        .pipe(sourcemaps.init())
        .pipe(concat('snap.js'))
        .pipe(gulp.dest(out))
        .pipe(concat('snap.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(out));
});

gulp.task('lint', function () {
    return gulp.src(src)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('images', () =>
    gulp.src('media/**')
        .pipe(imagemin())
        .pipe(gulp.dest('media'))
);

gulp.task('default', ['scripts']);

gulp.task('watch', function () {
    gulp.watch('src/**/*.js', ['default'])
});
