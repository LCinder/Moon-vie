
import {Movie} from "./movie"
import {Movies} from "./movies"
import lda from "lda";
//import rake from "rake-js";

function test(title: string): Movie {
    const movies: Movies = new Movies();
    const json: any = movies.find(title);
    const movie: Movie = new Movie(movies.convertJSON2Movie(json));
    return movie;
}

const movie = test("The Hobbit: An Unexpected Journey");
let keywords: string[] = movie.extractKeywords();//movie.overview
console.log(keywords);
