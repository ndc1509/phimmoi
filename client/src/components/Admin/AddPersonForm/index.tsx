import { yupResolver } from "@hookform/resolvers/yup";
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  FormHelperText,
  TextField,
} from "@mui/material";
import { useSnackbar } from "notistack";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { postPerson } from "../../../api/adminApi";
import { Person } from "../../../interface";
import CustomInput from "../MovieForm/Custom/Input";
import "./AddPersonForm.css";
const validationSchema = yup.object({
  name: yup.string().required(),
  role: yup.array().min(1).required(),
});

const AddPersonForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      role: [],
    },
    mode: "onBlur",
    resolver: yupResolver(validationSchema),
  });
  const { enqueueSnackbar } = useSnackbar();
  const addNewPerson = async (person: Person) => {
    try {
      const data = await postPerson(person);
      if (data.success)
        enqueueSnackbar(data.msg, {
          autoHideDuration: 3000,
          variant: "success",
          anchorOrigin: {
            horizontal: "right",
            vertical: "bottom",
          },
        });
    } catch (error) {
      console.log(error);
    }
  };
  const onSubmit = (data) => {
    addNewPerson(data);
    console.log(data);
  };
  return (
    <Box sx={{width: "200px", padding: 1}}>
      <form onSubmit={handleSubmit(onSubmit)} className="person-form">
        <h3>Add a new person</h3>
        <CustomInput control={control} label="Name" name="name" />
        <Controller
          name="role"
          control={control}
          render={({ field: { onChange, value } }) => (
            <FormControl>
              <Autocomplete
                multiple
                value={value}
                onChange={(event, item) => {
                  onChange(item);
                }}
                options={["actor", "director"]}
                getOptionLabel={(option) => option}
                filterSelectedOptions
                renderInput={(params) => {
                  return (
                    <TextField {...params} variant="standard" label="Role" />
                  );
                }}
              />
              {errors.role?.message && (
                <FormHelperText error>{errors.role?.message}</FormHelperText>
              )}
            </FormControl>
          )}
        />

        <Button type="submit" sx={{margin: 2, width: "50px"}} variant="contained" size="small">Add</Button>
      </form>
    </Box>
  );
};
export default AddPersonForm;
