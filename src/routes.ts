
import {Movie} from "./movie" ;
import {Movies} from "./movies";
import fastify, {FastifyRequest} from "fastify";

export const server = fastify({logger: true});
/**********************************************************************************************************************/
/**********************************************************************************************************************/
server.get("/status", async (request, reply) => {
    reply.code(200).send("{status: Ok}");
});
/**********************************************************************************************************************/
/**********************************************************************************************************************/
server.get("/movies", async (request, reply) => {
    try {
        const movies = new Movies();
        request.log.info("Movies sent");
        reply.code(200).send(movies.movies);
    } catch(err: any) {
        request.log.error(err.message);
        reply.code(400).send({error: err.message, code: 400});
    }
});
/**********************************************************************************************************************/
/**********************************************************************************************************************/
server.get("/movies/:movie", async (request: any, reply) => {
    try {
        const movies = new Movies();
        const movie: Movie = new Movie(movies.convertJSON2Movie(movies.find(request.params.movie)));
        request.log.info(`Movie ${movie.title} sent`);
        reply.code(200).send(JSON.stringify(movie));
    } catch(err: any) {
        request.log.error(`${err.message} : ${request.params.movie}`);
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
        request.log.info(`Extracted and sent keywords from movie ${movie.title}`);
        reply.code(200).send(JSON.stringify(keywords));
    } catch(err: any) {
        request.log.error(`${err.message} : ${request.params.movie}`);
        reply.code(404).send(JSON.stringify({error: err.message, code: 404}));
    }
});
/**********************************************************************************************************************/
/**********************************************************************************************************************/
server.listen(5001)