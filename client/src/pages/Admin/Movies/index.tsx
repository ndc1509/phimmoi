import { Box, Button } from "@mui/material";
import React from "react";
import { adminApi } from "@api/adminApi";
import { movieApi } from "@api/movieApi";
import DataTable from "@components/Admin/MovieDataTable";
import MovieForm from "@components/Admin/MovieForm";
import useAppSnackBar from "@hooks/useAppSnackBar";
import { Movie } from "@types";

const AdminMoviesPage = () => {
    const [openForm, setOpenForm] = React.useState<boolean>(false);
    const [editMovie, setEditMovie] = React.useState<Movie | null>(null);
    const showSnackbar = useAppSnackBar();

    React.useEffect(() => {
        if (!openForm) setEditMovie(null);
    }, [openForm]);

    const onEdit = async (movieId: string) => {
        try {
            if (movieId) {
                const data = await movieApi.getDetails(movieId);
                setOpenForm(true);
                setEditMovie(data.movie);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const onDelete = async (movieId: string) => {
        try {
            const confirmed = window.confirm("Please confirm to delete");
            if (movieId && confirmed) {
                const data = await adminApi.deleteMovie(movieId);
                data.success
                    ? showSnackbar(data.msg, "success")
                    : showSnackbar(data.msg, "error");
                return data.success as boolean;
            }
        } catch (error) {
            console.log(error);
        }
    };

    if (!openForm)
        return (
            <>
                <Box sx={{ padding: 1 }}>
                    <Button
                        variant="contained"
                        onClick={() => setOpenForm(true)}
                    >
                        Add
                    </Button>
                </Box>
                <DataTable onEdit={onEdit} onDelete={onDelete} />
            </>
        );
    else if (openForm || editMovie)
        return (
            <>
                <Box sx={{ padding: 1 }}>
                    <Button
                        variant="contained"
                        onClick={() => {
                            window.confirm("Go back?") && setOpenForm(false);
                        }}
                    >
                        Back
                    </Button>
                </Box>
                <MovieForm values={editMovie} />
            </>
        );
    else return <></>;
};

export default AdminMoviesPage;
