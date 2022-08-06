import * as React from "react";
import ReactPlayer from "react-player";
import "./MoviePlayer.css";

const MoviePlayer = ({ videoSrc, thumbnailSrc }) => {
  const [playing, setPlaying] = React.useState<boolean>(false);
  const playerRef = React.useRef<ReactPlayer>(null);
  React.useEffect(() => {
    setPlaying(false);
    playerRef.current?.seekTo(0);
    playerRef.current?.showPreview();
  }, [videoSrc, thumbnailSrc]);
  return (
    <div className="movie-player">
      <ReactPlayer
        ref={playerRef}
        url={videoSrc}
        playing={playing}
        controls={true}
        light={thumbnailSrc}
        width="100%"
        height="100%"
        onClickPreview={() => setPlaying(true)}
      />
    </div>
  );
};

export default MoviePlayer;
