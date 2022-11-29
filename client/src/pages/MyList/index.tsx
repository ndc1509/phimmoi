import { myListApi } from "@api/myListApi";
import CircularLoading from "@components/CircularLoading";
import MovieCard from "@components/MovieCard";
import { Movie } from "@types";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const MyListPage = () => {
    const [movies, setMovies] = React.useState<Movie[]>([]);
    const fetchData = React.useCallback(async () => {
        try {
            const data = await myListApi.getWatchListDetails();
            setMovies(data.watchList);
        } catch (error) {
            console.log(error);
        }
    }, []);
    React.useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <div className="movie-grid-container">
            <div className="movie-grid__title">My List</div>
            <InfiniteScroll
                next={fetchData}
                hasMore={false}
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

export default MyListPage;
