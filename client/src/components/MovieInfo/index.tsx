import { Star } from "@mui/icons-material";
import { FaImdb } from "react-icons/fa";
import { Movie } from "../../interface";
import Tag from "../About/Tag";
import ShareButton from "../Buttons/ShareButton";
import "./MovieInfo.css";
type MovieInfoProps = {
  movie: Movie;
};
const MovieInfo = ({ movie }: MovieInfoProps) => {
  const seasons = movie.tvSeriesInfo?.seasons;
  const stars = movie?.stars;
  const genres = movie?.genres;
  return (
    <div className="info">
      <div className="info--left">
        <div className="info__metadata">
          <div className="info__year">{movie?.year}</div>
          <span>{movie?.contentRating}</span>
          {seasons && movie.type === "tvSeries"
            ? `${seasons.length} Season${seasons.length > 1 ? "s" : ""}`
            : movie?.runtimeStr}
        </div>
        <div className="info__rating">
          <div className="info__rating__imDb">
            <FaImdb /> &nbsp;
            {movie?.ratings?.imDbRating ? movie.ratings.imDbRating : "0"} / 10
          </div>

          <div className="info__rating__user">
            User Rating:{" "}
            {movie?.ratings?.userRating ? movie.ratings.userRating : "0"} / 5{" "}
            <Star />
          </div>
        </div>
        <ShareButton />
        <div className="info__plot">{movie?.plot}</div>
      </div>
      <div className="info--right">
        <div className="info__cast">
          <span>Cast: </span>
          {stars?.map((star, idx) => (
            <Tag
              key={idx}
              data={star}
              last={idx === stars.length - 1 ? true : false}
              type="person"
            />
          ))}
        </div>
        <div className="info__genres">
          <span>Genres: </span> &nbsp;
          {genres?.map((genre, idx) => (
            <Tag
              key={idx}
              data={genre}
              last={idx === genres.length - 1 ? true : false}
              type="genre"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieInfo;
