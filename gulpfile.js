
const gulp = require("gulp");
const ts = require("gulp-typescript");
const mocha = require("gulp-mocha");

gulp.task("default", () => {
    const tsProject = ts.createProject("../tsconfig.json");
    const tsProject2 = ts.createProject("../tsconfig.json");

    return gulp.src("src/**/*.ts")
    .pipe(tsProject())
    .pipe(gulp.dest("../test/"));

    /*gulp.src("../test/*.ts")
    .pipe(tsProject2())
    .pipe(gulp.dest("../test/"))*/

});

gulp.task("test", () => {
   gulp.src("../test/tests.js").watch("../test/*.js").pipe(mocha());
});


gulp.task("tests", gulp.series("default", "test"), (done) => {
    done();
});