import { Modal } from "@mui/material";
import React, { useMemo } from "react";
import ReactPlayer from "react-player";
import { Trailer } from "../../../interface";
import Thumbnail from "../../Thumbnail";
import "./Trailer.css";
type TrailerProps = {
  trailer: Trailer;
};

const TrailerItem = ({ trailer }: TrailerProps) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getVideoThumbnail = useMemo(() => {
    const regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = trailer.videoLink.match(regExp);
    const id = match && match[7].length == 11 ? match[7] : false;
    return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
  }, [trailer.videoLink]);

  return (
    <>
      <div className="trailer-item" onClick={handleOpen}>
        <Thumbnail link={getVideoThumbnail} styles={{aspectRatio: "16/9"}}/>
        <div className="trailer-item__title">{trailer.title}</div>
      </div>
      <Modal open={open} onClose={handleClose}>
        <div className="trailer-item__modal">
          <ReactPlayer url={trailer.videoLink} controls playing />
        </div>
      </Modal>
    </>
  );
};

export default TrailerItem;
