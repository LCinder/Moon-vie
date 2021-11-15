
const gulp = require("gulp");
const ts = require("gulp-typescript");
const mocha = require("gulp-mocha");

gulp.task("default", (done) => {
    const tsProject = ts.createProject("../tsconfig.json");

    gulp.src("./*.ts")
    .pipe(tsProject())
    .pipe(gulp.dest("./"));

    done();
});

gulp.task("test", gulp.series("default", (done) => {
   gulp.src("./tests.js").pipe(mocha());
   done();
}));
