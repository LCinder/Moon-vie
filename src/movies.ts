import movies from "../data/movies.json";
import {Movie} from "./movie"
import {IMovie} from "./IMovie";


export class Movies {
     private readonly _movies;

    constructor() {
        this._movies = movies;
    }

    get movies() {
        return this._movies;
    }

    find(id: string): IMovie {
        const res: IMovie = this._movies.movies.find((e: IMovie) => {
            if (e.id === id)
                return e;
        });
        return res;
    }

    convertJSON2Movie(json: IMovie): Movie {
        const movie = new Movie();
        if (json !== undefined) {
            movie.title = json.title;
            movie.id = json.id;
            movie.overview = json.overview;
            movie.popularity = json.popularity;
            movie.voteAverage = json.vote_average;
            if(json.reviews !== undefined) {
                json.reviews.forEach((review: string) => {
                    movie.addReview(movie.removeBadCharacters(review))
                });
            }
            return movie;
        } else {
            throw new Error("Movie does not exist");
        }
    }

}