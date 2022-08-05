import * as React from "react";
import { Movie } from "../../../interface";
import { getAllMovies } from "../../../api/adminApi";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Tab,
  Button,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
type DataTableProps = {
  onEdit?: (movieId: string) => Promise<void>;
  onDelete?: (movieId: string) => Promise<void | boolean>;
};
export default function DataTable({ onEdit, onDelete }: DataTableProps) {
  const [rows, setRows] = React.useState<Movie[]>([]);
  const getData = async () => {
    try {
      const data = await getAllMovies();
      setRows(data.movies);
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    getData();
  }, []);
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
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell align="right">{row.type}</TableCell>
              <TableCell align="right">{row.year}</TableCell>
              <TableCell align="right">{row.runtimeStr}</TableCell>
              <TableCell align="right">{row.ratings?.userRating}</TableCell>
              <TableCell align="right">
                <IconButton
                  onClick={() => {
                    if (onEdit && row._id) onEdit(row._id);
                  }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={async () => {
                    if (onDelete && row._id) {
                      const success = await onDelete(row._id);
                      if (success) getData();
                    }
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
}
