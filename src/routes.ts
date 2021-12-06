
import {Movie} from "./movie" ;
import {Movies} from "./movies";
import fastify, {FastifyRequest} from "fastify";

export const server = fastify();
/**********************************************************************************************************************/
/**********************************************************************************************************************/
server.get("/status", async (request, reply) => {
    reply.code(200).send("{status: Ok}");
});
/**********************************************************************************************************************/
/**********************************************************************************************************************/
server.get("/movies", async (request, reply) => {
    const movies = new Movies();
    reply.code(200).send(movies.movies);
});
/**********************************************************************************************************************/
/**********************************************************************************************************************/
server.get("/movies/:movie", async (request: any, reply) => {
    try {
        const movies = new Movies();
        const movie: Movie = new Movie(movies.convertJSON2Movie(movies.find(request.params.movie)));
        reply.code(200).send(JSON.stringify(movie));
    } catch(err: any) {
        reply.code(404).send({error: err.message, code: 404});
    }
});
/**********************************************************************************************************************/
/**********************************************************************************************************************/
server.get("/movies/:movie/keywords", async (request: any, reply) => {
    try {
        const movies = new Movies();
        const movie: Movie = new Movie(movies.convertJSON2Movie(movies.find(request.params.movie)));
        const keywords: string[] = movie.extractKeywords();
        reply.code(200).send(JSON.stringify(keywords));
    } catch(err: any) {
        reply.code(404).send({error: err.message, code: 404});
    }
});
/**********************************************************************************************************************/
/**********************************************************************************************************************/
//server.listen(9000)