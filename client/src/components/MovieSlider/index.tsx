import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { Movie } from "@types";
import MovieCard from "../MovieCard";
import "./MovieSlider.css";
type MovieSliderProps = {
    movies: Array<Movie>;
    title: string;
    slidesToShow?: number;
    slidesToScroll?: number;
};

const MovieSlider = ({
    movies,
    title,
    slidesToShow = 6,
    slidesToScroll = 6,
}: MovieSliderProps) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow,
        slidesToScroll,
    };

    return (
        <div className="slider-wrapper">
            <div className="slider-title">{title}</div>
            <Slider {...settings}>
                {movies.map((movie, idx) => (
                    <MovieCard key={idx} movie={movie} />
                ))}
            </Slider>
        </div>
    );
};

export default MovieSlider;
