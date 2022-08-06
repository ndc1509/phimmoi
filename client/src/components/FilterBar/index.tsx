import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import React from "react";
import { getGenres } from "../../api/genreApi";
import { Genre } from "../../interface";
import "./FilterBar.css";
const FilterBar = ({ title = "Movies", getMovies }) => {
  const [genres, setGenres] = React.useState<Genre[]>([]);

  React.useEffect(() => {
    const getData = async () => {
      try {
        const data = await getGenres();
        setGenres(data.genres);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  const [selectedId, setSelectedId] = React.useState<string>("all");
  const handleChange = (event: SelectChangeEvent) => {
    setSelectedId(event.target.value);
  };

  React.useEffect(() => {
    getMovies(selectedId);
  }, [selectedId]);

  return (
    <div className="filter-bar">
      <div className="filter-bar__title">{title}</div>
      <div className="filter-bar__select">
        <Select
          value={selectedId}
          onChange={handleChange}
          displayEmpty
          size="small"
        >
          <MenuItem value="all">Genres</MenuItem>
          {genres?.map((genre, idx) => (
            <MenuItem key={idx} value={genre._id}>
              {genre.name}
            </MenuItem>
          ))}
        </Select>
      </div>
    </div>
  );
};

export default React.memo(FilterBar);
