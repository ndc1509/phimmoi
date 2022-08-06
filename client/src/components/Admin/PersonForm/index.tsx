import { yupResolver } from "@hookform/resolvers/yup";
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  FormHelperText,
  TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { postPerson, putPerson } from "../../../api/adminApi";
import useAppSnackBar from "../../../hooks/useAppSnackBar";
import { Person } from "../../../interface";
import CustomInput from "../MovieForm/Custom/Input";
import "./PersonForm.css";
const validationSchema = yup.object({
  name: yup.string().required(),
  role: yup.array().min(1).required(),
});
type PersonFormProps = {
  values?: Person | null;
};
const PersonForm = ({ values }: PersonFormProps) => {
  const showSnackbar = useAppSnackBar();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: values || {
      name: "",
      role: [],
    },
    mode: "onBlur",
    resolver: yupResolver(validationSchema),
  });

  const addNewPerson = async (person: Person) => {
    try {
      const data = values ? await putPerson(person) : await postPerson(person);
      data.success
        ? showSnackbar(data.msg, "success")
        : showSnackbar(data.msg, "error");
    } catch (error) {
      console.log(error);
    }
  };
  const onSubmit = (data) => {
    addNewPerson(data);
    console.log(data);
  };

  return (
    <Box sx={{ width: "200px", padding: 1 }}>
      <form onSubmit={handleSubmit(onSubmit)} className="person-form">
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
                <FormHelperText error>{errors.role.message}</FormHelperText>
              )}
            </FormControl>
          )}
        />

        <Button
          type="submit"
          sx={{ margin: 2, width: "50px" }}
          variant="contained"
          size="small"
        >
          Submit
        </Button>
      </form>
    </Box>
  );
};
export default PersonForm;
