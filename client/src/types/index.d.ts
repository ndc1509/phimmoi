export interface Movie {
    _id?: string;
    title: string;
    type: "movie" | "tvSeries";
    year?: number;
    runtimeStr?: string;
    plot?: string;
    directors?: Person[];
    stars?: Person[];
    genres?: Genre[];
    countries?: Country[];
    contentRating?: string;
    ratings?: {
        imDbRating?: number;
        userRating?: number;
    };
    //Media
    media?: {
        image: string;
        logo: string;
        backdrop: string;
        previewVideo?: string;
        trailers?: Trailer[];
    };
    tvSeriesInfo?: {
        seasons: Array<Season>;
    } | null;
    movieInfo?: {
        videoLink: string;
    } | null;
    similars?: {
        _id: string;
        title: string;
        image: string;
    }[];
    //Search score
    searchScore?: number;
}

export interface Trailer {
    title: string;
    videoLink: string;
}

export interface Person {
    _id?: string;
    name: string;
    role?: string[];
}

export interface Genre {
    _id?: string;
    name: string;
}

export interface Country {
    _id?: string;
    name: string;
}

export interface Episode {
    _id?: string;
    episodeNumber: number;
    title?: string;
    plot?: string;
    thumbnail?: string;
    runtimeStr?: string;
    videoLink: string;
}

export interface Season {
    _id?: string;
    seasonNumber: number;
    title?: string;
    plot?: string;
    year?: number;
    totalEpisodes?: number;
    episodes: Episode[];
}

export interface User {
    _id: string;
    username: string;
    email: string;
    picture: string;
    role: string;
    accessToken: string | null;
}

export interface Account {
    username?: string;
    email: string;
    password: string;
    rememberMe?: boolean;
}

export interface NewAccount {
    username: String;
    email: String;
    password: String;
    confirmPassword: String;
}

export interface Response {
    success: boolean;
    msg: string;
    data: object;
}

export interface ErrorResponse {
    success: boolean;
    msg: string;
}

export interface AuthSuccessResponse extends ErrorResponse {
    accessToken: string;
}

export interface GetDirectorsResponse extends ErrorResponse {
    directors: Person[];
}

export interface GetActorsResponse extends ErrorResponse {
    actors: Person[];
}

export interface GetGenresResponse extends ErrorResponse {
    genres: Genres[];
}

export interface GetCountriesResponse extends ErrorResponse {
    countries: Country[];
}

export interface PostPersonResponse extends ErrorResponse {
    person: Person;
}

