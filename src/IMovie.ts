
export interface IMovie {
    id: string,
    adult: boolean,
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    backdrop_path: string,
    genre_ids: number [],
    release_date: string,
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number,
    reviews: string[]
}