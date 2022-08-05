import React from "react";
import { Movie } from "../../interface";
import MovieCard from "../MovieCard";
import "./MovieSimilar.css";
type SimilarProps = {
  movies: Movie[];
};

const Similar = ({ movies }: SimilarProps) => {
  return (
    <div className="similar">
      <div className="similar__title">Similar</div>
      <div className="similar__grid">
        {movies.map((movie) => (
          <MovieCard movie={movie} key={movie._id} />
        ))}
      </div>
    </div>
  );
};

export default Similar;
