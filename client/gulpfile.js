const gulp = require("gulp");
const zip = require("gulp-zip");

const buildNext = () => {
    return gulp.src(".next/**").pipe(gulp.dest("dist/.next"));
};

const buildPlatform = () => {
    return gulp.src(".platform/**").pipe(gulp.dest("dist/.platform"));
};

const builConfig = () => {
    return gulp.src("next.config.js").pipe(gulp.dest("dist"));
};

const buildPackage = () => {
    return gulp.src("package.json").pipe(gulp.dest("dist"));
};

const buildPublic = () => {
    return gulp.src("public/**").pipe(gulp.dest("dist/public"));
};

const archive = () => {
    return gulp
        .src("./dist/**", { dot: true })
        .pipe(zip("archive.zip"))
        .pipe(gulp.dest("./dist"));
};

exports.default = gulp.series(
    buildNext,
    buildPlatform,
    builConfig,
    buildPackage,
    buildPublic,
    archive
);
