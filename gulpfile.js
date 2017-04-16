var gulp = require('gulp'),
    concat = require('gulp-concat'),
    rev = require('gulp-rev'),
    revCollector = require('gulp-rev-collector'),
    notify = require('gulp-notify'),
    cleanCSS = require('gulp-clean-css'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync').create(),
    imagemin = require('gulp-imagemin');
    var reload      = browserSync.reload;



//合并、压缩、打版本号
// gulp.task('concat', function() {
//     return gulp.src(['src/scss/*.css'])
//         .pipe(concat('main.min.css')) //合并为main.min.css
//         .pipe(cleanCSS()) //压缩mainCSS
//         .pipe(gulp.dest('gulp-test/css/')) //生成到指定目录
//         .pipe(notify({
//             message: 'concat minicss rev complate'
//         }))
// });

//替换资源路径
// gulp.task('revCollector', function() {
//     return gulp.src(['src/**/*.*','!src/scss/*.*']) //指定要替换连接的文件以及对应的配置文件。
//         //.pipe(imageMin()) //开始替换
//         .pipe(revCollector()) //开始替换
//         .pipe(gulp.dest('dist')) //重新生成替换好练级后的文件。
// });


//替换资源路径
gulp.task('src', function() {
    return gulp.src(['src/**/*.*','!src/scss/*.*']) //指定要替换连接的文件以及对应的配置文件。
        //.pipe(imageMin()) //开始替换
        
        .pipe(gulp.dest('dist')) //重新生成替换好练级后的文件。
});


//图片压缩
gulp.task('imagemin', function () {
    gulp.src('src/img/*.{png,jpg,gif,ico}')
        .pipe(imagemin({
            optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
        }))
        .pipe(gulp.dest('src/img'));
});
//js压缩
gulp.task('jsMini', function() {
    return gulp.src('src/js/*.js')
        .pipe(concat('all.js'))
       // .pipe(gulp.dest('gulp-test/dest/'))
        .pipe(rename('all.min.js'))
        .pipe(uglify({
            mangle: true, //类型：Boolean 默认：true 是否修改变量名
            compress: true, //类型：Boolean 默认：true 是否完全压缩
            preserveComments: 'all' //保留所有注释
        }))
        //.pipe(gulp.dest('gulp-test/js/'))
        .pipe(gulp.dest('src/js/'));
})
//css编译压缩
gulp.task('sass', function() {
    return gulp.src('src/scss/*.+(scss|sass)')
        .pipe(sass({
            "outputStyle": "expanded"
        }))
        .pipe(concat('all.min.css')) //合并为main.min.css
        .pipe(cleanCSS()) //压缩mainCSS
        //.pipe(gulp.dest('gulp-test/css/')) //生成到指定目录
        .pipe(gulp.dest('src/css/'))
        .pipe(reload({stream: true}));
       
});
//html编译压缩
// gulp.task('htmlMin', function() {
//     return gulp.src('src/**/*.html')
//         .pipe(gulp.dest('gulp-test/')) //生成到指定目录
       
// });


// 静态服务器
gulp.task('browser-sync', function() {
    browserSync.init({
        files: "**",
        server: {
            baseDir: "./src"
        }
    });

    gulp.watch('src/scss/*.*',['sass']);
    gulp.watch('src/js/*.*',['jsMini']);
    //gulp.watch('src/**/*.html',['htmlMin']);
   // gulp.watch("src/**/*.html").on('change', reload);
});


gulp.task('default', ['browser-sync']);
// gulp.task('reload', function() {
//     browserSync.reload();
// });

// gulp.task('watch',function(){
//     gulp.watch('src/scss/*.*',['sass']);
//     gulp.watch('src/js/*.*',['jsMini']);
//     gulp.watch('src/**/*.html',['htmlMin']);
//     gulp.watch('src/**/*.*',['reload']);

// })



