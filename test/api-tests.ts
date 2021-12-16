
import "mocha";
import {assert} from "chai";
import {server} from "../src/routes";


describe("GET /status", async () => {
    it("Deberia devolver en body 'Ok'", async () => {
        const res = await server.inject({
            url: "/status"
        });
        assert.include(res.body, "Ok");
        assert.equal(res.statusCode, 200);
    });
});

describe("GET /movies", async () => {
    it("Deberia ser un array con varios elementos", async () => {
        const res = await server.inject({
            url: "/movies"
        });
        assert.isAbove(res.body.length, 2);
        assert.equal(res.statusCode, 200);
    });
});

describe("GET /movies/TheHobbit:AnUnexpectedJourney(2012)", async () => {
    it("Deberia ser una pelicula", async () => {
        const res = await server.inject({
            url: "/movies/TheHobbit:AnUnexpectedJourney(2012)"
        });
        assert.equal(JSON.parse(res.body)._title, "The Hobbit: An Unexpected Journey");
        assert.equal(res.statusCode, 200);
    });
});

describe("GET /movies/TheHobbit:AnUnexpectedJourney(2012)/keywords", async () => {
    it("Deberia devolver un array de palabras clave 'string'", async () => {
        const res = await server.inject({
            url: "/movies/TheHobbit:AnUnexpectedJourney(2012)/keywords"
        });
        assert.isArray(JSON.parse(res.body));
        assert.isAbove(res.body.length, 2);
        assert.equal(res.statusCode, 200);
    });
});

describe("GET /movies/HobbitNoExiste(2012) y GET /movies/HobbitNoExiste(2012)/keywords",() => {
    it("Deberia devolver error 404 y mensaje pelicula no existe", async () => {
        const res = await server.inject({
            url: "/movies/HobbitNoExiste(2012)"
        });
        assert.equal(JSON.parse(res.body).error, "Movie does not exist");
        assert.equal(res.statusCode, 404);
    });

    it("Deberia devolver error 404 y keywords de pelicula no existe", async (done) => {
        const res = await server.inject({
            url: "/movies/HobbitNoExiste(2012)/keywords"
        });
        assert.equal(JSON.parse(res.body).error, "Movie does not exist");
        assert.equal(res.statusCode, 404);
    });
});