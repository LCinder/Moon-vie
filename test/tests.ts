
import "mocha";
import {assert} from "chai";
import {Movies} from "../src/movies";
import {Movie} from "../src/movie";
import {server} from "../src/routes";

const movies = new Movies();
const movieObject = movies.find("The Hobbit: An Unexpected Journey");
const movieObjectYear = movies.find("Hobbit (2012)");
const movie: Movie = new Movie(movies.convertJSON2Movie(movieObject));
const movieYear: Movie = new Movie(movies.convertJSON2Movie(movieObjectYear));


describe("Quiero obtener informacion de una pelicula", () => {
    describe("Pelicula existe", () => {
        it("Deberia existir", () => {
            assert.exists(movie);
            assert.exists(movieYear);
        });
        it("Deberia tener propiedad id", () => {
            assert.property(movie, "id");
            assert.property(movieYear, "id");
        });
        it("Deberia poder ver la overview", () => {
            assert.property(movie, "overview");
            assert.isNotEmpty(movie.overview);

            assert.property(movieYear, "overview");
            assert.isNotEmpty(movieYear.overview);
        });
        it("Reviews deberia ser un array y no estar vacio", () => {
            assert.isArray(movie.reviews);
            assert.isNotEmpty(movie.reviews);
            assert.isArray(movieYear.reviews);
            assert.isNotEmpty(movieYear.reviews);
        });
        it("Vote average deberia ser un nº entre 0 y 10", () => {
            assert.isNumber(movie.voteAverage);
            assert.isAtLeast(movie.voteAverage, 0);
            assert.isAtMost(movie.voteAverage, 10);

            assert.isNumber(movieYear.voteAverage);
            assert.isAtLeast(movieYear.voteAverage, 0);
            assert.isAtMost(movieYear.voteAverage, 10);
        });
    });
    describe("Pelicula no existe", () => {
        it("Salta error 'Movie does not exist'", () => {
            assert.throws(() => {
                const movieObjectError = movies.find("Inception2");
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
    it("Deberia incluir keywords 'story', 'bilbo', 'dragon'", () => {
        assert.include(keywords, "story");
        assert.include(keywords, "dragon");
        assert.include(keywords, "bilbo");
    });
    it("Deberia incluir keywords basadas en gustos 'amazing', 'loved', 'great'", () => {
        assert.include(keywords, "amazing");
        assert.include(keywords, "loved");
        assert.include(keywords, "great");
    });
});