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

    getMovie(title: string): Movie {
        return this._movies.convertJSON2Movie(this._movies.find(title));
    }

    getKeywords(movie: Movie): string[] {
        return movie.extractKeywords();
    }
}