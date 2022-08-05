import { useNavigate } from "react-router-dom";
import { Episode } from "../../../interface";
import Thumbnail from "../../Thumbnail";
import "./EpisodeItem.css";
type EpisodeItemProps = {
  movieId: string,
  seasonNumber: number,
  episode: Episode;
  selected?: boolean;
};

const EpisodeItem = ({ movieId, seasonNumber, episode, selected = false }: EpisodeItemProps) => {
  const link = episode?.thumbnail || "";
  const navigate = useNavigate()
  const handleClick = () => {
    navigate(`/watch/${movieId}/ss${seasonNumber}/ep${episode.episodeNumber}`)
  };
  return (
    <div
      className="episode-item"
      style={{ backgroundColor: selected ? "grey" : "inherit" }}
    >
      <div className="episode-item__header" onClick={handleClick}>
        <Thumbnail link={link} styles={{ width: "100%" }} />
        <div className="episode-item__metadata" >
          <div className="episode-item__title">
            {episode.episodeNumber}. {episode.title}
          </div>
          <span className="episode-item__time">{episode.runtimeStr}</span>
        </div>
      </div>
      <div className="episode-item__body">
        <div>{episode.plot}</div>
      </div>
    </div>
  );
};

export default EpisodeItem;
