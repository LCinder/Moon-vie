import movies from "../data/movies.json";
import {Movie} from "./movie"
import {IMovie} from "./IMovie";
import {Db, MongoClient} from "mongodb";
import {EtcdService} from "./etcd-service";


export class Movies {
     private readonly _movies;
     private dbClient: Db | undefined;
     private service;
     private URI: string;

    constructor() {
        this._movies = movies;
        this.service = new EtcdService();
        this.URI = "";
    }

    get movies() {
        return this._movies;
    }

    find(id: string): IMovie {
        const res: IMovie = this._movies.movies.find((element: IMovie) => {
            if (element.id === id)
                return element;
        });
        return res;
    }

    async setURI() {
        const host = await this.service.get("HOST");
        const port = await this.service.get("PORT");
        this.URI = `mongodb://${host}:${port}`;
    }

    async initializeDb() {
        try {
            await this.setURI();
            const client = await MongoClient.connect(this.URI);
            this.dbClient = client?.db("db");
        } catch (err) {
            console.log(err);
        }
    }

    async findDb(movieTitle: string): Promise<IMovie> {
        if (this.dbClient === undefined)
            await this.initializeDb();

        let movie;
        if(movieTitle !== "")
            movie = await this.dbClient!.collection("movies").findOne({id:  movieTitle});
        else
            movie = await this.dbClient!.collection("movies").find({});
        return movie;
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