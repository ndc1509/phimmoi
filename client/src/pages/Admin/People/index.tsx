import { adminApi } from "@api/adminApi";
import DataTable from "@components/Admin/PeopleDataTable";
import PersonForm from "@components/Admin/PersonForm";
import useAppSnackBar from "@hooks/useAppSnackBar";
import { Box, Button } from "@mui/material";
import { Person } from "@types";
import React from "react";

const AdminPeoplePage = () => {
    const [openForm, setOpenForm] = React.useState<boolean>(false);
    const [editPerson, setEditPerson] = React.useState<Person | null>(null);
    const showSnackbar = useAppSnackBar();
    React.useEffect(() => {
        if (!openForm) setEditPerson(null);
    }, [openForm]);
    const onEdit = async (person: Person) => {
        setOpenForm(true);
        setEditPerson(person);
    };
    const onDelete = async (personId: string) => {
        try {
            const confirmed = window.confirm("Please confirm to delete");
            if (personId && confirmed) {
                const data = await adminApi.deletePerson(personId);
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
    else if (openForm || editPerson)
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
                <PersonForm values={editPerson} />
            </>
        );
    else return <></>;
};

export default AdminPeoplePage;
