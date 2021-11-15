
const gulp = require("gulp");
const ts = require("gulp-typescript");
const mocha = require("gulp-mocha");

gulp.task("default", () => {
    const tsProject = ts.createProject("../tsconfig.json");

    return gulp.src("./*.ts")
    .pipe(tsProject())
    .pipe(gulp.dest("./"));
});

gulp.task("test", gulp.series("default", (done) => {
   gulp.src("./tests.js").pipe(mocha());
   done();
}));
