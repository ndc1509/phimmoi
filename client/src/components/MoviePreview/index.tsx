import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { Button, IconButton } from "@mui/material";
import React from "react";
import ReactPlayer from "react-player";
import { Movie } from "../../interface";
import AddButton from "../Buttons/AddButton";
import MoreInfoButton from "../Buttons/MoreInfoButton";
import RatingButton from "../Buttons/RatingButton";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "./MoviePreview.css";
import "react-lazy-load-image-component/src/effects/opacity.css";
import "react-lazy-load-image-component/src/effects/blur.css";
type MoviePreviewProps = {
  movie?: Movie;
  homepage: boolean;
};
const MoviePreview = ({ movie, homepage = false }: MoviePreviewProps) => {
  const playerRef = React.useRef<ReactPlayer>(null);
  const [playing, setPlaying] = React.useState<boolean>(false);
  const [muted, setMuted] = React.useState<boolean>(true);
  const handleSound = () => {
    setMuted(!muted);
  };

  React.useEffect(() => {
    if (playing) {
      setPlaying(false);
      playerRef.current?.seekTo(0);
    }
    const id = setTimeout(() => {
      setPlaying(true);
    }, 4000);
    return () => clearTimeout(id);
  }, [movie?._id]);
  return (
    <div className="preview">
      <ReactPlayer
        ref={playerRef}
        className="preview__video"
        url={movie?.media?.previewVideo}
        playing={playing}
        loop={false}
        controls={false}
        muted={muted}
        width="100%"
        height="100%"
        onEnded={() => setPlaying(false)}
      />
      <div
        className={
          playing
            ? "preview__backdrop preview__backdrop--hidden"
            : "preview__backdrop"
        }
      >
        <LazyLoadImage
          src={movie?.media?.backdrop}
          alt="backdrop"
          effect="blur"
          width="100%"
        />
      </div>
      <div className="preview-layer"></div>
      <div className="preview-controller__container">
        <div className="preview-controller--wrapper">
          <LazyLoadImage
            className={playing ? "movie-logo--playing" : ""}
            alt="logo"
            src={movie?.media?.logo}
            width="400px"
            effect="opacity"
          />

          <div className="preview-controller">
            <Button
              className="preview-controller__play"
              variant="contained"
              size="large"
              href={
                movie?.type === "movie"
                  ? `/watch/${movie._id}`
                  : `/watch/${movie?._id}/ss1/ep1`
              }
            >
              <PlayArrowIcon />
              Play
            </Button>
            {!homepage ? (
              <>
                <div className="preview-controller__round-btn--wrapper">
                  <AddButton _id={movie?._id} />
                </div>
                <div className="preview-controller__round-btn--wrapper">
                  <RatingButton _id={movie?._id} />
                </div>
              </>
            ) : (
              <MoreInfoButton movie={movie} />
            )}
          </div>
        </div>
        <div className="video-sound">
          <IconButton size="small" onClick={handleSound}>
            {muted ? <VolumeOffIcon /> : <VolumeUpIcon />}
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default MoviePreview;
