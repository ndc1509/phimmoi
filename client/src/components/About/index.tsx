import { Movie } from "../../interface";
import "./About.css";
import Tag from "./Tag";
type AboutProps = {
  movie: Movie;
};
const About = ({ movie }: AboutProps) => {
  return (
    <div className="about">
      <div className="about__header">
        About <span className="about__title">{movie?.title}</span>
      </div>
      <div className="about__body">
        <div className="about__item">
          <span>
            {movie?.directors && movie.directors.length > 1
              ? "Directors: "
              : "Director: "}
          </span>
          {movie?.directors?.map((person, index) => (
            <Tag
              key={index}
              data={person}
              last={index + 1 === movie.directors?.length && true}
              type="person"
            />
          ))}
        </div>
        <div className="about__item">
          <span>
            {movie?.stars && movie.stars.length > 1 ? "Stars: " : "Star: "}
          </span>
          {movie?.stars?.map((person, index) => (
            <Tag
              key={index}
              data={person}
              last={index + 1 === movie.stars?.length && true}
              type="person"
            />
          ))}
        </div>
        <div className="about__item">
          <span>
            {movie?.genres && movie.genres.length > 1 ? "Genres: " : "Genre: "}
          </span>
          {movie?.genres?.map((genre, index) => (
            <Tag
              key={index}
              data={genre}
              last={index + 1 === movie.genres?.length && true}
              type="genre"
            />
          ))}
        </div>
        {/* <div className="about__item">
          <span>
            Tags: &nbsp;
            {movie?.genres?.map((genre, index) => (
              <Tag
                key={index}
                data={genre}
                last={index + 1 === movie.genres?.length && true}
              />
            ))}
          </span>
        </div> */}
        <div className="about__item">
          <span>Maturity rating: &nbsp;</span>
          <span id="content-rating">{movie?.contentRating}</span>
        </div>
      </div>
    </div>
  );
};

export default About;
