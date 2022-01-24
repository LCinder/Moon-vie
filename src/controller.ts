import {Movies} from "./movies";
import {Movie} from "./movie";

export class Controller {

    private readonly _movies: Movies;

    constructor() {
       this._movies = new Movies();
    }

    get movies() {
        return this._movies;
    }

    async getMovie(title: string) {
        const movie = await this._movies.findDb(title);
        return this._movies.convertJSON2Movie(movie);
    }

    getKeywords(movie: Movie): string[] {
        return movie.extractKeywords();
    }
}