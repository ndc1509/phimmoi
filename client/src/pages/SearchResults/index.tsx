import { CircularProgress } from "@mui/material";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate, useParams } from "react-router-dom";
import { searchMovies } from "../../api/movieApi";
import MovieCard from "../../components/MovieCard";
import { Movie } from "../../interface";
import "./SearchResults.css";

const SearchResultsPage = () => {
  const [movies, setMovies] = React.useState<Movie[]>([]);
  const [hasMore, setHasMore] = React.useState<boolean>(true);
  const navigate = useNavigate();
  const { query } = useParams();
  const initSearch = async () => {
    try {
      if (query) {
        const data = await searchMovies(query, undefined, undefined, 8);
        data.movies.length < 8 ? setHasMore(false) : setHasMore(true);
        setMovies(data.movies);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const searchMore = async () => {
    try {
      if (query) {
        const lastScore = movies[movies.length - 1].searchScore || undefined;
        const lastIds = movies
          .filter((movie) => movie.searchScore === lastScore)
          .map((movie) => movie._id || "");
        const data = await searchMovies(query, lastIds, lastScore);
        data.movies.length < 4 ? setHasMore(false) : setHasMore(true);
        setMovies((prev) => prev.concat(data.movies));
      }
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    if (query) {
      initSearch();
    } else if (query === "") navigate("/");
  }, [query]);
  return (
    <div className="search-results">
      <div className="search-results__for">Search results for "{query}"</div>
      <div className="movie-grid-container">
        <InfiniteScroll
          next={searchMore}
          hasMore={hasMore}
          loader={
            <div className="circle-loading">
              <CircularProgress />
            </div>
          }
          dataLength={movies?.length || 0}
        >
          <div className="movie-grid">
            {movies?.map((movie) => (
              <MovieCard key={movie._id} movie={movie} />
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default SearchResultsPage;
