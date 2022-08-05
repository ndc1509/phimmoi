import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import React from "react";
import { Movie, Season } from "../../interface";
import EpisodeItem from "./EpisodeItem";
import "./EpisodesList.css";
type EpisodeProps = {
  movie: Movie;
  playingEpId?: string;
  playingSsId?: string;
};
const Episodes = ({ movie, playingEpId, playingSsId }: EpisodeProps) => {
  const seasons = movie?.tvSeriesInfo?.seasons;

  const [selectedSeason, setSelectedSeason] = React.useState<
    Season | undefined
  >(seasons?.at(0));
  const handleChange = (event: SelectChangeEvent) => {
    setSelectedSeason(
      seasons?.find((season) => season._id === event.target.value)
    );
  };
  React.useEffect(() => {
    if (seasons && playingSsId) {
      setSelectedSeason(seasons.find((season) => season._id === playingSsId));
    }
  }, []);

  return (
    <div className="episodes">
      <div className="episodes__header">
        <div className="episodes__title">
          <span>Episodes</span>
          <span>{movie?.title}</span>
        </div>
      </div>
      {seasons ? (
        <div className="episodes__body">
          <div className="season-details--wrapper">
            <div>
              <div className="season-year">
                Release year: {selectedSeason?.year}
              </div>
              <div className="season-plot">{selectedSeason?.plot}</div>
            </div>

            <div className="season-select">
              <Select
                className="season-list"
                value={selectedSeason?._id}
                onChange={handleChange}
                displayEmpty
                size="small"
              >
                {seasons.map((season, idx) => (
                  <MenuItem key={idx} value={season._id}>
                    {season.title}
                  </MenuItem>
                ))}
              </Select>
            </div>
          </div>

          <div className="season-episode">
            {selectedSeason?.episodes.map((ep, idx) => (
              <EpisodeItem
                key={idx}
                episode={ep}
                movieId={movie._id || ""}
                seasonNumber={selectedSeason.seasonNumber}
                selected={ep._id === playingEpId && true}
              />
            ))}
          </div>
        </div>
      ) : (
        <div>NO DATA</div>
      )}
    </div>
  );
};

export default Episodes;
