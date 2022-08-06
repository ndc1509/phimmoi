import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
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
import * as React from "react";
import { getAllPeople } from "../../../api/adminApi";
import { Person } from "../../../interface";
type PeopleDataTableProps = {
  onEdit?: (person: Person) => Promise<void>;
  onDelete?: (_id: string) => Promise<boolean | undefined>;
};
const PeopleDataTable = ({ onEdit, onDelete }: PeopleDataTableProps) => {
  const [rows, setRows] = React.useState<Person[]>([]);
  const getData = async () => {
    try {
      const data = await getAllPeople();
      if (data)
        setRows([...data.directorsData.directors, ...data.actorsData.actors]);
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
            <TableCell>Name</TableCell>
            <TableCell>Roles</TableCell>
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
                {row.name}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.role?.toString()}
              </TableCell>
              <TableCell align="right">
                <IconButton
                  onClick={() => {
                    if (onEdit && row._id) onEdit(row);
                  }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={async () => {
                    if (onDelete && row._id) {
                      const success = await onDelete(row._id);
                      console.log(success)
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
};

export default PeopleDataTable;
