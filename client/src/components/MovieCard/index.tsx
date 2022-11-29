import { Skeleton } from "@mui/material";
import {
    LazyLoadComponent,
    LazyLoadImage,
} from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/opacity.css";
import { useNavigate } from "react-router-dom";
import { Movie } from "@types";
import "./MovieCard.css";
type MovieCardProps = {
    movie: Movie;
};

const MovieCard = ({ movie }: MovieCardProps) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/details/${movie._id}`);
    };

    return (
        <div className="movie-card" onClick={handleClick}>
            <LazyLoadComponent
                delayTime={Math.floor(Math.random() * (600 - 200) + 200)}
            >
                <LazyLoadImage
                    src={movie.media?.image}
                    alt={movie.title}
                    width="100%"
                    effect="opacity"
                    placeholder={
                        <div className="ske">
                            <Skeleton variant="rectangular" width={"100%"} />
                        </div>
                    }
                />
                <div className="movie-card__info">{movie.title}</div>
            </LazyLoadComponent>
        </div>
    );
};

export default MovieCard;
