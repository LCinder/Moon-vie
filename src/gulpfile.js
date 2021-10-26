
const gulp = require("gulp");
const ts = require("gulp-typescript");

gulp.task("default", () => {
    return gulp.src("./*.ts")
    .pipe(ts({
        isolatedModules: true
    }))
    .pipe(gulp.dest("./"));
});
