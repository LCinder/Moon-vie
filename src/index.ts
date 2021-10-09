

import fetch from "node-fetch";
import axios from "axios";
import * as assert from "assert";

class Movie {
    private _id: number;
    private _title: string;
    private _overview: string;
    private _popularity: number;
    private _voteAverage: number;
    private _reviews: string[];

    constructor(title: string) {
        this._id = 0;
        this._title = title;
        this._overview = "";
        this._popularity = 0;
        this._voteAverage = 0;
        this._reviews = [];
    }

    get reviews(): string[] {
        return this._reviews;
    }

    set reviews(value: string[]) {
        this._reviews = value;
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }

    get overview(): string {
        return this._overview;
    }

    set overview(value: string) {
        this._overview = value;
    }

    get popularity(): number {
        return this._popularity;
    }

    set popularity(value: number) {
        this._popularity = value;
    }

    get voteAverage(): number {
        return this._voteAverage;
    }

    set voteAverage(value: number) {
        this._voteAverage = value;
    }

    toString(): string {
        return `Movie: ${this._title}, con id: ${this.id}, nº reviews: ${this.reviews.length}, `
        + `descripcion: ${this.overview}, `
        + `popularity: ${this.popularity} y votos: ${this.voteAverage}/10`;
    }

    addReview(review: string) {
        this.reviews.push(review);
    }

    async fetchAPI(url: string) {
        let response: any = await axios.get(url);
        return response.data;
    }

    convertJSON2Movie(data: any) {
        let id: number;
        let overview: string;
        let popularity: number;
        let voteAverage: number;
        let json = data.results[0];

        this._id = json.id;
        this._overview = json.overview;
        this._popularity = json.popularity;
        this._voteAverage = json.vote_average;
    }

}

async function test1() {
    const movie1 = new Movie("TeneT");
    movie1.id = 10;
    movie1.overview = "overview";
    movie1.popularity = 15000;
    movie1.voteAverage = 7.2;
    movie1.addReview("Review 1");
    movie1.addReview("Review 2");

    console.log(movie1.toString());
}

async function test2() {
    const movie2 = new Movie("Tenet");
    const data = await movie2.fetchAPI("https://api.themoviedb.org/3/search/movie?api_key=fdb992d2ada5a7f84c5e7349353f36b8&language=en-US&query=tenet&page=1&include_adult=false");
    await movie2.convertJSON2Movie(data);
    console.log(movie2.toString());
}



test1();
test2();