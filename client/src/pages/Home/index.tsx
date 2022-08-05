import { CircularProgress } from "@mui/material";
import React from "react";
import { getHomePageData } from "../../api/movieApi";
import MoviePreview from "../../components/MoviePreview";
import MovieSlider from "../../components/MovieSlider";
import "./Home.css";

const HomePage = () => {
  const [movies, setMovies] = React.useState<any>();
  const getData = async () => {
    try {
      const data = await getHomePageData();
      console.log(data);
      setMovies(data.movies);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getData();
  }, []);
  if (movies)
    return (
      <div className="home">
        <div className="home-header">
          <MoviePreview movie={movies.randMovie} homepage={true} />
        </div>
        <div className="home-body">
          <MovieSlider title="Popular" movies={movies.popularMovies} />
          <MovieSlider title="New" movies={movies.newReleasesMovies} />
          <MovieSlider title="Best" movies={movies.bestMovies} />
          <MovieSlider title="Trending" movies={movies.trendingMovies} />
        </div>
      </div>
    );
  else
    return (
      <div className="home-loading">
        <div className="circle-loading">
          <CircularProgress />
        </div>
      </div>
    );
};

export default HomePage;
