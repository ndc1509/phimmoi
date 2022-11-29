import React, { useEffect } from "react";
import { genreApi } from "@api/genreApi";
import { Genre } from "@types";

const AdminGenresPage = () => {
    const [genres, setGenres] = React.useState<Genre[]>([]);
    useEffect(() => {
        (async () => {
            try {
                const data = await genreApi.getGenres();
                setGenres(data.genres);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);
    return (
        <div>
            All genres:
            {genres.map((genre) => genre.name + " ")}
        </div>
    );
};

export default AdminGenresPage;
