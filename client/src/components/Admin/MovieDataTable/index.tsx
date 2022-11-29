import { adminApi } from "@api/adminApi";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PreviewIcon from "@mui/icons-material/Preview";
import {
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import { Movie } from "@types";
import * as React from "react";

type MovieDataTableProps = {
    onEdit?: (movieId: string) => Promise<void>;
    onDelete?: (movieId: string) => Promise<boolean | undefined>;
};
const MovieDataTable = ({ onEdit, onDelete }: MovieDataTableProps) => {
    const [rows, setRows] = React.useState<Movie[]>([]);
    React.useEffect(() => {
        (async () => {
            try {
                const data = await adminApi.getAllMovies();
                setRows(data.movies);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);
    const handleDelete = async (id: string) => {
        if (onDelete && id) {
            await onDelete(id);
            setRows(pre => pre.filter((row) => id !== row._id));
        }
    };
    const handleEdit = async (id: string) => {
        if (onEdit && id) await onEdit(id);
    };

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell align="right">Type</TableCell>
                        <TableCell align="right">Year</TableCell>
                        <TableCell align="right">Runtime</TableCell>
                        <TableCell align="right">User rating</TableCell>
                        <TableCell align="right">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row._id}
                            sx={{
                                "&:last-child td, &:last-child th": {
                                    border: 0,
                                },
                            }}
                        >
                            <TableCell component="th" scope="row">
                                {row.title}
                            </TableCell>
                            <TableCell align="right">{row.type}</TableCell>
                            <TableCell align="right">{row.year}</TableCell>
                            <TableCell align="right">
                                {row.runtimeStr}
                            </TableCell>
                            <TableCell align="right">
                                {row.ratings?.userRating}
                            </TableCell>
                            <TableCell align="right">
                                <IconButton
                                    onClick={() => {
                                        window.open(
                                            `/details/${row._id}`,
                                            "_blank"
                                        );
                                    }}
                                >
                                    <PreviewIcon />
                                </IconButton>
                                <IconButton
                                    onClick={async () => {
                                        await handleEdit(row._id!);
                                    }}
                                >
                                    <EditIcon />
                                </IconButton>
                                <IconButton
                                    onClick={async () => {
                                        await handleDelete(row._id!);
                                    }}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default MovieDataTable;
