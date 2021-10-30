
export class Movie {
    private _id: number;
    private _title: string;
    private _overview: string;
    private _popularity: number;
    private _voteAverage: number;
    private _reviews: string[];

    constructor(movie?: Movie) {
        if(movie !== undefined) {
            this._id = movie.id;
            this._title = movie.title;
            this._overview = movie.overview;
            this._popularity = movie.popularity;
            this._voteAverage = movie.voteAverage;
            this._reviews = movie.reviews;
        } else {
            this._id = 0;
            this._title = "";
            this._overview = "";
            this._popularity = 0;
            this._voteAverage = 0;
            this._reviews = [];
        }
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
            + `popularity: ${this.popularity} votos: ${this.voteAverage}/10, `
            + `\nReviews: \n\n ${this._reviews.toString()}`;
    }

    removeBadCharacters(review: string): string {
        const cleaned = review.replace(/["'“\-()\n]/g, "")
        .replace(/\s\s+/g, " ");
        return cleaned;
    }

    addReview(review: string) {
        this.reviews.push(review);
    }

    extractKeywords(): string[] {
        let res: string [] = [];

        return res;
    }

}