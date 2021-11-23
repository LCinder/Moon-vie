
import {Movie} from "./movie"
import {Movies} from "./movies"
import {IMovie} from "./IMovie";

function test(title: string): Movie {
    const movies: Movies = new Movies();
    const json: IMovie = movies.find(title);
    const movie: Movie = new Movie(movies.convertJSON2Movie(json));
    return movie;
}

const movie = test("The Hobbit: An Unexpected Journey");
const keywords: string[] = movie.extractKeywords();
console.log(keywords);
