
import {Movie} from "./movie"
import {Movies} from "./movies"

function test(title: string) {
    const movies: Movies = new Movies();
    const json: any = movies.find(title);
    const movie: Movie = new Movie(movies.convertJSON2Movie(json));
    console.log(movie.toString());
}

test("La La Land");