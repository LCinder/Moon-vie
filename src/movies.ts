import movies from "../data/movies.json";
import {Movie} from "./movie"


export class Movies {
    private _movies: any;

    constructor() {
        this._movies = movies;
    }

    find(title: string): any {
        let res: any = this._movies.movies.find((e: { original_title: string; }) => {
            if(e.original_title === title) {
                return e;
            }
        });
        return res;
    }

    convertJSON2Movie(json: any): Movie {
        const movie = new Movie();
        movie.id = json.id;
        movie.overview = json.overview;
        movie.popularity = json.popularity;
        movie.voteAverage = json.vote_average;
        json.reviews.forEach((review: string) => movie.addReview(review));
        return movie;
    }

}