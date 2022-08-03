const gulp = require("gulp");
const postcss = require("gulp-postcss");
const sourcemaps = require("gulp-sourcemaps");
const autoprefixer = require("autoprefixer");
const postcssCustomProperties = require("postcss-custom-properties");
const cssnano = require("cssnano");
const imagemin = require("gulp-imagemin");

gulp.task("handleCssFile", gulp.series(function() {
  return gulp
    .src("src/index.css")
    .pipe(sourcemaps.init())
    .pipe(postcss([autoprefixer(), postcssCustomProperties(), cssnano()]))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("./build"));
}));

gulp.task("handleHtmlFile", gulp.series(function() {
  return gulp.src("src/index.html").pipe(gulp.dest("build/"));
}));

gulp.task("handleImages", gulp.series(function() {
  return gulp
    .src("src/images/*")
    .pipe(imagemin())
    .pipe(gulp.dest("./build/images"));
}));

gulp.task("copyRemainingFiles", gulp.series(function() {
  return gulp
    .src(["src/favicons/**/*", "src/manifest.json", "src/privacy/**", "src/android-privacy-policy.html"], {
      base: "src"
    })
    .pipe(gulp.dest("./build"));
}));

gulp.task("default", gulp.parallel([
  "handleCssFile",
  "handleHtmlFile",
  "handleImages",
  "copyRemainingFiles"
]));
