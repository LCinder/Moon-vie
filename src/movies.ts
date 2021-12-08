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

    find(title: string): IMovie {
        const containsYear: RegExpMatchArray | null = title.match(/\([0-9]{4}\)/g);
        let titleParsed: string;
        let year: RegExpMatchArray | null;

        if (containsYear) {
            titleParsed = title.replace(/\s/g, "");
            year = title.match(/[0-9]{4}/g);
            titleParsed = titleParsed.replace(/\([0-9]{4}\)/g, "");
        }
        else
            titleParsed = title.replace(/\s/g, "");

        const matchTitle = (element: IMovie) => {
            const originalTitleParsed: string = element.original_title.replace(/\s/g, "");
            return originalTitleParsed === titleParsed;
        };

        const containsTitle = (element: IMovie) => {
            const originalTitleParsed: string = element.original_title.replace(/\s/g, "");
            const elementYear: RegExpMatchArray | null = element.release_date.match(/[0-9]{4}/g);
            let yearsEqual = false;

            if (year) {
                if (elementYear) {
                    if (year[0] === elementYear[0])
                        yearsEqual = true;
                }
            }
            return (originalTitleParsed.includes(titleParsed)
            && yearsEqual);
        };

        const res: IMovie = this._movies.movies.find((e: IMovie) => {
            if(matchTitle(e) || containsTitle(e)) {
                return e;
            }
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
            json.reviews.forEach((review: string) => {
                movie.addReview(movie.removeBadCharacters(review))
            });
            return movie;
        } else {
            throw new Error("Movie does not exist");
        }
    }

}