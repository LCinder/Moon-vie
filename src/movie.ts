import lda from "lda";
import {stopWords} from "./stopWords";

export class Movie {
    private _id: string;
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
            this._id = "";
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

    get id(): string {
        return this._id;
    }

    set id(value: string) {
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

    // Elimina ", quotes, -, (), y saltos de linea \n
    removeBadCharacters(review: string): string {
        return review.replace(/["'“\-()\n]/g, "")
        .replace(/\s\s+/g, " ");
    }

    addReview(review: string) {
        this.reviews.push(review);
    }

    extractKeywords(): string[] {
        const keywords: string [] = [];
        const information: string[] = this._reviews;
        const allStopWords: string[] = this._title.toLowerCase().split(/[\s,:\-\n]+/);
        let ldaElement;

        allStopWords.concat(stopWords);
        information.push(this._overview);

        if (information !== undefined) {
            information.forEach(element => {
                ldaElement = lda(element.match( /[^.!?]+[.!?]+/g ), 5, 10, null, null, null, 123);
                if (ldaElement[0] !== undefined) {
                    ldaElement[0].forEach((term: { term }) => {
                        if(!allStopWords.includes(term.term))
                            keywords.push(term.term);
                    });
                }
            });
        }

        return keywords;
    }

}