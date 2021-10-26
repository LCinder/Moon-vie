
import "mocha";
import sinon from "sinon";
import chai from "chai";
import {assert} from "chai";
import {Movies} from "./movies";
import {Movie} from "./movie";


describe("Quiero obtener informacion de una pelicula", () => {
    const movies = new Movies();
    const movieObject = movies.find("Tenet");
    const movie: Movie = new Movie(movies.convertJSON2Movie(movieObject));

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
        console.log(movie.toString());

    });
    it("Vote average deberia ser un nº entre 0 y 10", () => {
        assert.isNumber(movie.voteAverage);
        assert.isAtLeast(movie.voteAverage, 0);
        assert.isAtMost(movie.voteAverage, 10);
    });
/*    it("Spy", () => {
        const spy = sinon.spy(Movie.prototype, "addReview");
        const movie2 = movies.find("Tenet");
        assert.equal(spy.callCount, 5);
    });*/
});