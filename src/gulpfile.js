
const gulp = require("gulp");
const ts = require("gulp-typescript");
const mocha = require("gulp-mocha");
const tsProject = ts.createProject("tsconfing.json");

gulp.task("default", () => {
    return gulp.src("./*.ts")
    .pipe(ts())
    .pipe(gulp.dest("./"))
    .pipe(tsProject());
});

gulp.task("test", () => {
   gulp.src("./tests.js").pipe(mocha());
});
