import React, { useEffect } from "react";
import { getGenres } from "../../../api/genreApi";
import { Genre } from "../../../interface";

const AdminGenresPage = () => {
  const [genres, setGenres] = React.useState<Genre[]>([]);
  const getData = async () => {
    try {
      const data = await getGenres();
      setGenres(data.genres);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      All genres:
      {genres.map((genre) => genre.name + " ")}
    </div>
  );
};

export default AdminGenresPage;
