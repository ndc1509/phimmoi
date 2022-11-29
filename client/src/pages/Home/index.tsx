import { movieApi } from "@api/movieApi";
import CircularLoading from "@components/CircularLoading";
import MoviePreview from "@components/MoviePreview";
import MovieSlider from "@components/MovieSlider";
import React from "react";
import "./Home.css";

const HomePage = () => {
    const [movies, setMovies] = React.useState<any>();

    React.useEffect(() => {
        const getData = async () => {
            try {
                const data = await movieApi.getHomePageData();
                console.log(data);
                setMovies(data.movies);
            } catch (error) {
                console.log(error);
            }
        };
        getData();
    }, []);
    if (movies)
        return (
            <div className="home">
                <div className="home-header">
                    <MoviePreview movie={movies.randMovie} homepage={true} />
                </div>
                <div className="home-body">
                    <MovieSlider
                        title="Popular"
                        movies={movies.popularMovies}
                    />
                    <MovieSlider
                        title="New"
                        movies={movies.newReleasesMovies}
                    />
                    <MovieSlider title="Best" movies={movies.bestMovies} />
                    <MovieSlider
                        title="Trending"
                        movies={movies.trendingMovies}
                    />
                </div>
            </div>
        );
    else return <CircularLoading />;
};

export default HomePage;
