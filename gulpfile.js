/**
 * Created by liwenqian on 2017/2/28.
 */
var gulp=require('gulp');
var flatten = require('gulp-flatten');
var rev = require('gulp-rev');//把静态文件名改成hash的形式。
var uglify = require('gulp-uglify');//专业压缩 Javascript
var concat=require('gulp-concat');
var autoprefixer=require('gulp-autoprefixer');
var cleanCss=require('gulp-clean-css');
// Lint JavaScript'

gulp.task('css', function () {
    return gulp.src('src/**/*.css', {base: 'src'})
        .pipe(autoprefixer({
            browsers: [
                'Chrome > 20',
                'Firefox > 20',
                'IE 9',
                'last 2 versions',
                '> 5%'
            ],
            cascade: false,
            remove:false
        }))
        .pipe(cleanCss({
            compatibility: '*',
            level: 2
        }))
        .pipe(gulp.dest('dist'))
        .pipe(flatten())
        .pipe(rev())
        .pipe( rev.manifest() )
        .pipe( gulp.dest( 'rev/css' ) );
});

gulp.task('js', function () {
    return gulp.src('src/**/*.js', {base: 'src'})
        .pipe(uglify())
        .pipe(gulp.dest('dist'))
        .pipe(flatten())
        .pipe(rev())
        .pipe( rev.manifest() )
        .pipe( gulp.dest( 'rev/js' ) );
});

gulp.task('testAutoFx', function () {
    gulp.src('src/css/*.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'last 1 Chrome versions',"last 2 Explorer versions","Firefox >= 20","last 3 Safari versions"],
            cascade: true, //是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
            remove:false //是否去掉不必要的前缀 默认：true
        }))
        .pipe(gulp.dest('dist/css'));
});


gulp.task('default', function() {

});