
import "mocha";
import sinon from "sinon";
import chai from "chai";
import {assert} from "chai";
import {Movies} from "./movies";
import {Movie} from "./movie";

describe("Movie Tenet", () => {
    const movies = new Movies();
    const movie = movies.find("Tenet");

    it("Deberia existir", () => {
        assert.exists(movie);
    });
    it("Deberia tener propiedad id", () => {
        assert.property(movie, "id");
    });
    it("Reviews deberia ser un array y no estar vacio", () => {
        assert.isArray(movie.reviews);
        assert.isNotEmpty(movie.reviews);
    });
    it("Spy", () => {
        const spy = sinon.spy(Movie.prototype, "addReview");
        const movie2 = movies.find("Tenet");
        assert.equal(spy.callCount, 5);
    });
});