
const gulp = require("gulp");
const ts = require("gulp-typescript");
const mocha = require("gulp-mocha");

gulp.task("default", () => {
    const tsProject = ts.createProject("../tsconfig.json");

    return gulp.src("src/*.ts")
    .pipe(tsProject())
    .pipe(gulp.dest("dist/"));
});

gulp.task("test", () => {
   gulp.src("../test/tests.js").watch("../test/*.js").pipe(mocha());
});

gulp.task("test-ts", (done) => {
    gulp.src("test/tests.ts").pipe(mocha({
        require: ["ts-node/register"]
    }));
    done();
});


gulp.task("tests", gulp.series("default", "test"));