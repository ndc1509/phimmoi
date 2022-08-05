import { PlayCircleOutline } from "@mui/icons-material";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "./Thumbnail.css";
import 'react-lazy-load-image-component/src/effects/blur.css';
type ThumbnailProps = {
    link: string;
    styles?: React.CSSProperties 
}
const Thumbnail = ({ link, styles }: ThumbnailProps) => {
    return (
        <div className="trailer-item__thumbnail">
            <LazyLoadImage
                className="trailer-item__thumbnail__img"
                src={link}
                alt="thumbnail"
                style={{...styles}}
                effect='blur'
            />
            <div className="trailer-item__thumbnail__play-btn">
                <PlayCircleOutline />
            </div>
        </div>
    );
};

export default Thumbnail;
