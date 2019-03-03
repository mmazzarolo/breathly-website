const gulp = require("gulp");
const postcss = require("gulp-postcss");
const sourcemaps = require("gulp-sourcemaps");
const autoprefixer = require("autoprefixer");
const postcssCustomProperties = require("postcss-custom-properties");
const cssnano = require("cssnano");
const imagemin = require("gulp-imagemin");

gulp.task("handleCssFile", function() {
  return gulp
    .src("src/index.css")
    .pipe(sourcemaps.init())
    .pipe(postcss([autoprefixer(), postcssCustomProperties(), cssnano()]))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("./build"));
});

gulp.task("handleHtmlFile", function() {
  return gulp.src("src/index.html").pipe(gulp.dest("build/"));
});

gulp.task("handleImages", function() {
  return gulp
    .src("src/images/*")
    .pipe(imagemin())
    .pipe(gulp.dest("./build/images"));
});

gulp.task("copyRemainingFiles", function() {
  return gulp
    .src(["src/favicons/**/*", "src/manifest.json"], {
      base: "src"
    })
    .pipe(gulp.dest("./build"));
});

gulp.task("default", [
  "handleCssFile",
  "handleHtmlFile",
  "handleImages",
  "copyRemainingFiles"
]);
