"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Movies = void 0;
var movies_json_1 = __importDefault(require("../data/movies.json"));
var movie_1 = require("./movie");
var Movies = /** @class */ (function () {
    function Movies() {
        this._movies = movies_json_1.default;
    }
    Movies.prototype.find = function (title) {
        var res = this._movies.movies.find(function (e) {
            if (e.original_title === title) {
                return e;
            }
        });
        return res;
    };
    Movies.prototype.convertJSON2Movie = function (json) {
        var movie = new movie_1.Movie();
        if (json !== undefined) {
            movie.title = json.title;
            movie.id = json.id;
            movie.overview = json.overview;
            movie.popularity = json.popularity;
            movie.voteAverage = json.vote_average;
            json.reviews.forEach(function (review) {
                movie.addReview(movie.removeBadCharacters(review));
            });
            return movie;
        }
        else {
            throw new Error("Movie does not exist");
        }
    };
    return Movies;
}());
exports.Movies = Movies;
