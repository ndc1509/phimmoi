import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { CircularProgress } from "@mui/material";
import React, { useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getDetails } from "../../api/movieApi";
import CommentFB from "../../components/Buttons/CommentFB";
import Episodes from "../../components/EpisodesList";
import MoviePlayer from "../../components/MoviePlayer";
import { Episode, Movie, Season } from "../../interface";
import "./Watch.css";
const WatchPage = () => {
  const [movie, setMovie] = React.useState<Movie | null>(null);
  const [episode, setEpisode] = React.useState<Episode | null>(null);
  const [season, setSeason] = React.useState<Season | null>(null);
  const { ssId, epId, movieId } = useParams();
  const navigate = useNavigate();

  const seasonId: number = useMemo(
    () => (ssId && parseInt(ssId.slice(2))) || 0,
    [ssId]
  );
  const episodeId: number = useMemo(
    () => (epId && parseInt(epId.slice(2))) || 0,
    [epId]
  );
 
  const getData = async (_id: string) => {
    try {
      const data = await getDetails(_id);
      console.log(data);
      setMovie(data.movie);
    } catch (error) {
      console.log(error);
      navigate("/");
    }
  };

  React.useEffect(() => {
    if (movieId) getData(movieId);
  }, [movieId, epId, ssId]);
  
  React.useEffect(() => {
    if (seasonId && episodeId) {
      const selectedSeason = movie?.tvSeriesInfo?.seasons.find(
        (s) => s.seasonNumber === seasonId
      );
      const selectedEpisode = selectedSeason?.episodes.find(
        (e) => e.episodeNumber === episodeId
      );
      setSeason(selectedSeason || null);
      setEpisode(selectedEpisode || null);
    }
  }, [movie, episodeId, seasonId]);


  return (
    <div className="watch">
      <div className="watch__title">
        <Link to={`/details/${movie?._id}`}>{movie?.title}</Link>
        {movie?.type === "tvSeries" && (
          <>
            <ArrowForwardIosIcon /> Season {seasonId} <ArrowForwardIosIcon />{" "}
            Episode {episodeId}
          </>
        )}
      </div>

      {movie ? (
        <div className="watch-container">
          {movie.type === "movie" && (
            <>
              <MoviePlayer
                videoSrc={movie.movieInfo?.videoLink}
                thumbnailSrc={movie.media?.backdrop}
              />
              <div className="watch__info">
                <CommentFB />
              </div>
            </>
          )}
          {movie.type === "tvSeries" && episode && (
            <>
              <MoviePlayer
                videoSrc={episode?.videoLink}
                thumbnailSrc={episode?.thumbnail}
              />
              <div className="watch__info">
                <Episodes
                  playingEpId={episode?._id}
                  playingSsId={season?._id}
                  movie={movie || undefined}
                />
                <CommentFB />
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="watch__loading">
          <CircularProgress />
        </div>
      )}
    </div>
  );
};

export default WatchPage;
