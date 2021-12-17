
import {Movie} from "./movie" ;
import fastify from "fastify";
import {Controller} from "./controller";

const optionsLogger = {
    logger: {
        prettyPrint: {
            translateTime: "dd-mm-yyyy HH:MM:ss",
            ignore: "pid,reqId,hostname,responseTime,req,res",
            messageFormat: "{msg} [{req.method} {req.url} {res.statusCode}]"
        }
    }};

export const server = fastify(optionsLogger);

const controller = new Controller();
/**********************************************************************************************************************/
/**********************************************************************************************************************/
server.get("/status", async (request, reply) => {
    reply.code(200).send(JSON.stringify("status: Ok"));
});
/**********************************************************************************************************************/
/**********************************************************************************************************************/
server.get("/movies", async (request, reply) => {
    try {
        request.log.info("Movies sent");
        reply.code(200).send(JSON.stringify((controller.movies)));
    } catch(err: any) {
        request.log.error(err.message);
        reply.code(404).send(JSON.stringify(err.message));
    }
});
/**********************************************************************************************************************/
/**********************************************************************************************************************/
server.get("/movies/:movie", async (request: any, reply) => {
    try {
        const movie: Movie = controller.getMovie(request.params.movie);

        request.log.info(`Movie ${movie.title} sent`);
        reply.code(200).send(JSON.stringify(movie));
    } catch(err: any) {
        request.log.error(JSON.stringify((`${err.message} : ${request.params.movie}`)));
        reply.code(404).send(JSON.stringify(err.message));
    }
});
/**********************************************************************************************************************/
/**********************************************************************************************************************/
server.get("/movies/:movie/keywords", async (request: any, reply) => {
    try {
        const movie: Movie = controller.getMovie(request.params.movie);
        const keywords: string[] = controller.getKeywords(movie);

        request.log.info(`Extracted and sent keywords from movie ${movie.title}`);
        reply.code(200).send(JSON.stringify(keywords));
    } catch(err: any) {
        request.log.error(`${err.message} : ${request.params.movie}`);
        reply.code(404).send(JSON.stringify(err.message));
    }
});
/**********************************************************************************************************************/
/**********************************************************************************************************************/
//server.listen(5002)