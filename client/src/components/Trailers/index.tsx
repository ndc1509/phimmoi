import { Movie, Trailer } from "../../interface";
import { useAppSelector } from "../../store";
import { movieSelector } from "../../store/reducers/movieSlice";
import TrailerItem from "./TrailerItem";
import "./Trailers.css";
type TrailersProps = {
  movie: Movie;
};
const Trailers = ({ movie }: TrailersProps) => {
  const trailers: Trailer[] | undefined = movie.media?.trailers;
  return (
    <div className="trailers">
      <div className="trailers__header">Trailers & More</div>
      <div className="trailers__body">
        {trailers?.map((trailer, idx) => (
          <TrailerItem key={idx} trailer={trailer} />
        ))}
      </div>
    </div>
  );
};

export default Trailers;
