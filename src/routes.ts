
import {Movie} from "./movie" ;
import {Movies} from "./movies";
import fastify, {FastifyRequest} from "fastify";

export const server = fastify();
/**********************************************************************************************************************/
/**********************************************************************************************************************/
server.get("/status", async (request, reply) => {
    reply.send("{status: Ok}").code(200);
});
/**********************************************************************************************************************/
/**********************************************************************************************************************/
server.get("/movies", async (request, reply) => {
    const movies = new Movies();
    reply.send(movies.movies).code(200);
});
/**********************************************************************************************************************/
/**********************************************************************************************************************/
server.get("/movies/:movie", async (request: any, reply) => {
    try {
        const movies = new Movies();
        const movie: Movie = new Movie(movies.convertJSON2Movie(movies.find(request.params.movie)));
        reply.send(JSON.stringify(movie)).code(200);
    } catch(err: any) {
        reply.send({error: err.message, code: 404}).code(404);
    }
});
/**********************************************************************************************************************/
/**********************************************************************************************************************/
server.get("/movies/:movie/keywords", async (request: any, reply) => {
    try {
        const movies = new Movies();
        const movie: Movie = new Movie(movies.convertJSON2Movie(movies.find(request.params.movie)));
        const keywords: string[] = movie.extractKeywords();
        reply.send(JSON.stringify(keywords)).code(200);
    } catch(err: any) {
        reply.send({error: err.message, code: 404}).code(404);
    }
});
/**********************************************************************************************************************/
/**********************************************************************************************************************/
server.listen(5000)