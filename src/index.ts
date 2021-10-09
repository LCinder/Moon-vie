

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

        movie.id = json.id;
        movie.overview = json.overview;
        movie.popularity = json.popularity;
        movie.voteAverage = json.vote_average;
    }

}


let movie = new Movie("TeneT");
movie.id = 10;
movie.overview = "overview";
movie.popularity = 15000;
movie.voteAverage = 7.2;
movie.addReview("Review 1");
movie.addReview("Review 2");

console.log(movie.toString());
movie.fetchAPI("").then(res => {
    movie.convertJSON2Movie(res);
    console.log(movie.toString());
});

