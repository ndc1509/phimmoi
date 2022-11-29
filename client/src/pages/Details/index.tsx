import { CircularProgress } from "@mui/material";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { movieApi } from "@api/movieApi";
import About from "@components/About";
import CommentFB from "@components/Buttons/CommentFB";
import Episodes from "@components/EpisodesList";
import MovieDetails from "@components/MovieInfo";
import MoviePreview from "@components/MoviePreview";
import Similar from "@components/Similar";
import Trailers from "@components/Trailers";
import { Movie } from "@types";
import "./Details.css";

const DetailsPage = () => {
    const { movieId } = useParams();
    const navigate = useNavigate();
    const [movieDetails, setMovieDetails] = React.useState<{
        movie: Movie;
        similarMovies: Movie[];
    } | null>(null);

    React.useEffect(() => {
        (async () => {
            try {
                const data = await movieApi.getDetails(movieId!);
                setMovieDetails({
                    movie: data.movie,
                    similarMovies: data.similarMovies,
                });
            } catch (error) {
                console.log(error);
                navigate("/");
            }
        })();
    }, [movieId]);
    if (movieDetails) {
        return (
            <div className="details">
                <div className="details-header">
                    <MoviePreview movie={movieDetails.movie} homepage={false} />
                </div>
                <div className="details-body">
                    <div className="details-body__container">
                        <MovieDetails movie={movieDetails.movie} />
                        {movieDetails.movie.type === "tvSeries" && (
                            <Episodes movie={movieDetails.movie} />
                        )}
                        <Trailers movie={movieDetails.movie} />
                        <Similar movies={movieDetails.similarMovies} />
                        <About movie={movieDetails.movie} />
                        <CommentFB />
                    </div>
                </div>
            </div>
        );
    } else
        return (
            <div className="details__circle-loading">
                <CircularProgress />
            </div>
        );
};
export default DetailsPage;
