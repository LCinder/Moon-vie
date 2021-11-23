
const gulp = require("gulp");
const ts = require("gulp-typescript");
const mocha = require("gulp-mocha");
const istanbul = require("gulp-istanbul");
const eslint = require("gulp-eslint");

gulp.task("default", () => {
    const tsProject = ts.createProject("tsconfig.json");

    return gulp.src("src/*.ts")
    .pipe(tsProject())
    .pipe(gulp.dest("dist/"));
});

gulp.task("transpile-test", () => {
    const tsProject = ts.createProject("tsconfig.json");

    return gulp.src("test/*.ts")
        .pipe(tsProject())
        .pipe(gulp.dest("dist/"));
});

gulp.task("test", () => {
   return gulp.src("dist/tests.js").pipe(mocha());
});

gulp.task("test-ts", (done) => {
    gulp.src("test/tests.ts").pipe(mocha({
        require: ["ts-node/register"]
    }));
    done();
});

gulp.task("test-ts:coverage", (done) => {
    gulp.src("test/*.ts").pipe(mocha({
        require: ["ts-node/register"]
    }))
    .pipe(istanbul())
    .pipe(istanbul.writeReports());
    done();
});

gulp.task("lint", () => {
    return gulp.src("**/*.ts")
        .pipe(eslint({
            configFile: ".eslintrc"
        }))
        .pipe(eslint.format());
});


gulp.task("tests", gulp.series("default", "transpile-test", "test"));