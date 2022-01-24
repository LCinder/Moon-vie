
const gulp = require("gulp");
const ts = require("gulp-typescript");
const shell = require("gulp-shell");
const mocha = require("gulp-mocha");
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

gulp.task("test-transpile", () => {
   return gulp.src("dist/*.js").pipe(mocha());
});

gulp.task("run-server", () => {
    return gulp.src("src/routes.ts").pipe(shell("node dist/routes.js"));
});

gulp.task("build", (done) => {
    // No hace nada
    done();
});

gulp.task("install", (done) => {
    // No hace nada
    done();
});

gulp.task("test", (done) => {
    gulp.src("test/tests.ts").pipe(mocha({
        require: ["ts-node/register"]
    }));
    gulp.src("test/api-tests.ts").pipe(mocha({
        require: ["ts-node/register"],
        timeout: 10000
    }));
    gulp.src("test/etcd-tests.ts").pipe(mocha({
        require: ["ts-node/register"]
    }));
    done();
});

gulp.task("test-ts:coverage", (done) => {
    gulp.src("test/*.ts")
    .pipe(shell("nyc mocha --require ts-node/register test/*.ts"));
    done();
});

gulp.task("lint", (done) => {
    gulp.src("test/*.ts")
    .pipe(eslint({
        configFile: ".eslintrc"
    }))
    .pipe(eslint.format());

    gulp.src("src/*.ts")
    .pipe(eslint({
        configFile: ".eslintrc"
    }))
    .pipe(eslint.format());

    done();
});

gulp.task("server", gulp.series("default", "run-server"));

gulp.task("tests", gulp.series("default", "transpile-test", "test"));