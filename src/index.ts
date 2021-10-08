


class Movie {

    private _id: number;
    private _title: string;
    private _overview: string;
    private _popularity: number;
    private _voteAverage: number;
    private _reviews: string[];

    constructor(id: number, title: string, overview: string = "", popularity: number = 0, voteAverage: number = 0) {
        this._id = id;
        this._title = title
        this._overview = overview;
        this._popularity = popularity;
        this._voteAverage = voteAverage;
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

}


let movie = new Movie(10, "TeneT", "", 15000, 7.2);
movie.addReview("Review 1");
movie.addReview("Review 2");

console.log(movie.toString());