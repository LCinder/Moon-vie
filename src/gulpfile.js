
const gulp = require("gulp");
const ts = require("gulp-typescript");
const mocha = require("gulp-mocha");

gulp.task("default", (done) => {
    const tsProject = ts.createProject("../tsconfig.json");
    const tsProject2 = ts.createProject("../tsconfig.json");

    gulp.src("./*.ts")
    .pipe(tsProject())
    .pipe(gulp.dest("./"));

    gulp.src("../test/*.ts")
    .pipe(tsProject2())
    .pipe(gulp.dest("../test/"));

    done();

});

gulp.task("test",(done) => {
   gulp.src("../test/tests.js").pipe(mocha());
   done();
});


gulp.task("tests", gulp.series("default", "test"));