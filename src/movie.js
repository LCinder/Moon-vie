"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Movie = void 0;
var lda_1 = __importDefault(require("lda"));
var stopWords_1 = require("./stopWords");
var Movie = /** @class */ (function () {
    function Movie(movie) {
        if (movie !== undefined) {
            this._id = movie.id;
            this._title = movie.title;
            this._overview = movie.overview;
            this._popularity = movie.popularity;
            this._voteAverage = movie.voteAverage;
            this._reviews = movie.reviews;
        }
        else {
            this._id = 0;
            this._title = "";
            this._overview = "";
            this._popularity = 0;
            this._voteAverage = 0;
            this._reviews = [];
        }
    }
    Object.defineProperty(Movie.prototype, "reviews", {
        get: function () {
            return this._reviews;
        },
        set: function (value) {
            this._reviews = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Movie.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (value) {
            this._id = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Movie.prototype, "title", {
        get: function () {
            return this._title;
        },
        set: function (value) {
            this._title = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Movie.prototype, "overview", {
        get: function () {
            return this._overview;
        },
        set: function (value) {
            this._overview = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Movie.prototype, "popularity", {
        get: function () {
            return this._popularity;
        },
        set: function (value) {
            this._popularity = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Movie.prototype, "voteAverage", {
        get: function () {
            return this._voteAverage;
        },
        set: function (value) {
            this._voteAverage = value;
        },
        enumerable: false,
        configurable: true
    });
    Movie.prototype.toString = function () {
        return "Movie: " + this._title + ", con id: " + this.id + ", n\u00BA reviews: " + this.reviews.length + ", "
            + ("descripcion: " + this.overview + ", ")
            + ("popularity: " + this.popularity + " votos: " + this.voteAverage + "/10, ")
            + ("\nReviews: \n\n " + this._reviews.toString());
    };
    // Elimina ", quotes, -, (), y saltos de linea \n
    Movie.prototype.removeBadCharacters = function (review) {
        return review.replace(/["'“\-()\n]/g, "")
            .replace(/\s\s+/g, " ");
    };
    Movie.prototype.addReview = function (review) {
        this.reviews.push(review);
    };
    Movie.prototype.extractKeywords = function () {
        var keywords = [];
        var information = this._reviews;
        var allStopWords = this._title.toLowerCase().split(/[\s,:\-\n]+/);
        var ldaElement;
        allStopWords.concat(stopWords_1.stopWords);
        information.push(this._overview);
        information.forEach(function (element) {
            ldaElement = (0, lda_1.default)(element.match(/[^\.!\?]+[\.!\?]+/g), 5, 10, null, null, null, 123);
            ldaElement[0].forEach(function (term) {
                if (!allStopWords.includes(term.term))
                    keywords.push(term.term);
            });
        });
        return keywords;
    };
    return Movie;
}());
exports.Movie = Movie;
