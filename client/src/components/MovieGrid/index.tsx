import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { movieApi } from "@api/movieApi";
import FilterBar from "@components/FilterBar";
import MovieCard from "@components/MovieCard";
import { Movie } from "@types";
import CircularLoading from "../CircularLoading";
import "./MovieGrid.css";

type MovieGridProps = {
    type?: "movie" | "tvSeries";
};

const MovieGrid = ({ type }: MovieGridProps) => {
    const [movies, setMovies] = React.useState<Movie[]>([]);
    const [genreId, setGenreId] = React.useState<string>("all");
    const [hasMore, setHasMore] = React.useState<boolean>(true);
    const initMovies = React.useCallback(
        async (genreId: string) => {
            try {
                const data = await movieApi.getMoviesFiltered(type, genreId, 8);
                data.movies.length < 8 ? setHasMore(false) : setHasMore(true);
                setMovies(data.movies);
                setGenreId(genreId);
            } catch (error) {
                console.log(error);
            }
        },
        [type]
    );

    const getMoreMovies = React.useCallback(async () => {
        try {
            const lastId = movies[movies.length - 1]._id;
            const data = await movieApi.getMoviesFiltered(
                type,
                genreId,
                4,
                lastId
            );
            data.movies.length < 4 ? setHasMore(false) : setHasMore(true);
            setMovies((prev) => prev.concat(data.movies));
        } catch (error) {
            console.log(error);
        }
    }, [genreId, movies, type]);

    return (
        <div className="movie-grid-container">
            {type && (
                <FilterBar
                    getMovies={initMovies}
                    title={type === "movie" ? "Movies" : "TV-Series"}
                />
            )}

            <InfiniteScroll
                next={getMoreMovies}
                hasMore={hasMore}
                loader={<CircularLoading />}
                dataLength={movies?.length || 0}
            >
                <div className="movie-grid">
                    {movies?.map((movie) => (
                        <MovieCard key={movie._id} movie={movie} />
                    ))}
                </div>
            </InfiniteScroll>
        </div>
    );
};

export default MovieGrid;
