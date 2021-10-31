
import "mocha";
import chai from "chai";
import {assert} from "chai";
import {Movies} from "./movies";
import {Movie} from "./movie";

const movies = new Movies();
const movieObject = movies.find("The Hobbit: An Unexpected Journey");
const movie: Movie = new Movie(movies.convertJSON2Movie(movieObject));


describe("Quiero obtener informacion de una pelicula", () => {
    describe("Pelicula existe", () => {
        it("Deberia existir", () => {
            assert.exists(movie);
        });
        it("Deberia tener propiedad id", () => {
            assert.property(movie, "id");
        });
        it("Deberia poder ver la overview", () => {
            assert.property(movie, "overview");
            assert.isNotEmpty(movie.overview);
        });
        it("Reviews deberia ser un array y no estar vacio", () => {
            assert.isArray(movie.reviews);
            assert.isNotEmpty(movie.reviews);
        });
        it("Vote average deberia ser un nº entre 0 y 10", () => {
            assert.isNumber(movie.voteAverage);
            assert.isAtLeast(movie.voteAverage, 0);
            assert.isAtMost(movie.voteAverage, 10);
        });
    });
    describe("Pelicula no existe", () => {
        it("Salta error 'Movie does not exist'", () => {
            assert.throws(() => {
                const movieObjectError = movies.find("Inception");
                const movieError: Movie = new Movie(movies.convertJSON2Movie(movieObjectError));
            }, "Movie does not exist");
        });
    });
});
describe("Quiero saber la clasificacion tematica de una pelicula", () => {
    const keywords = movie.extractKeywords();
    it("Deberia obtener array y no estar vacio", () => {
        assert.isArray(keywords);
        assert.isNotEmpty(keywords);
    });
    it("Deberia incluir keywords 'story', 'dragon', 'hobbit'", () => {
        assert.include(keywords, "story");
        assert.include(keywords, "dragon");
        assert.include(keywords, "hobbit");
    });
    it("Deberia incluir keywords basadas en gustos 'amazing', 'loved', 'great'", () => {
        assert.include(keywords, "amazing");
        assert.include(keywords, "loved");
        assert.include(keywords, "great");
    });
});