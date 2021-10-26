
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
});