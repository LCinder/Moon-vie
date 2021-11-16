"use strict";
exports.__esModule = true;
require("mocha");
var chai_1 = require("chai");
var movies_1 = require("../src/movies");
var movie_1 = require("../src/movie");
var movies = new movies_1.Movies();
var movieObject = movies.find("The Hobbit: An Unexpected Journey");
var movie = new movie_1.Movie(movies.convertJSON2Movie(movieObject));
describe("Quiero obtener informacion de una pelicula", function () {
    describe("Pelicula existe", function () {
        it("Deberia existir", function () {
            chai_1.assert.exists(movie);
        });
        it("Deberia tener propiedad id", function () {
            chai_1.assert.property(movie, "id");
        });
        it("Deberia poder ver la overview", function () {
            chai_1.assert.property(movie, "overview");
            chai_1.assert.isNotEmpty(movie.overview);
        });
        it("Reviews deberia ser un array y no estar vacio", function () {
            chai_1.assert.isArray(movie.reviews);
            chai_1.assert.isNotEmpty(movie.reviews);
        });
        it("Vote average deberia ser un nº entre 0 y 10", function () {
            chai_1.assert.isNumber(movie.voteAverage);
            chai_1.assert.isAtLeast(movie.voteAverage, 0);
            chai_1.assert.isAtMost(movie.voteAverage, 10);
        });
    });
    describe("Pelicula no existe", function () {
        it("Salta error 'Movie does not exist'", function () {
            chai_1.assert.throws(function () {
                var movieObjectError = movies.find("Inception2");
                var movieError = new movie_1.Movie(movies.convertJSON2Movie(movieObjectError));
            }, "Movie does not exist");
        });
    });
});
describe("Quiero saber la clasificacion tematica de una pelicula", function () {
    var keywords = movie.extractKeywords();
    it("Deberia obtener array y no estar vacio", function () {
        chai_1.assert.isArray(keywords);
        chai_1.assert.isNotEmpty(keywords);
    });
    it("Deberia incluir keywords 'story', 'bilbo', 'dragon'", function () {
        chai_1.assert.include(keywords, "story");
        chai_1.assert.include(keywords, "dragon");
        chai_1.assert.include(keywords, "bilbo");
    });
    it("Deberia incluir keywords basadas en gustos 'amazing', 'loved', 'great'", function () {
        chai_1.assert.include(keywords, "amazing");
        chai_1.assert.include(keywords, "loved");
        chai_1.assert.include(keywords, "great");
    });
});
