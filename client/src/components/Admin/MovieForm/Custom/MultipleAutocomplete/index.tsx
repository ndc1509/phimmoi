import {
    Autocomplete,
    FormControl,
    FormHelperText,
    TextField
} from "@mui/material";
import { Control, useController } from "react-hook-form";
import { Country, Genre, Movie, Person } from "../../../../../interface";

type MultipleAutocompleteProps = {
  data: Person[] | Genre[] | Country[];
  control: Control<Movie, object>;
  name: any;
  label: string;
};

const MultipleAutocomplete = ({
  data,
  control,
  name,
  label,
}: MultipleAutocompleteProps) => {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
    // formState: { errors },
  } = useController({
    name,
    control,
    defaultValue: "",
  });
  return (
    <FormControl>
      <Autocomplete
        multiple
        onChange={(event, values) => {
          onChange(values);
          console.log(values);
        }}
        value={value}
        options={data}
        getOptionLabel={(option) => option.name}
        filterSelectedOptions
        renderInput={(params) => {
          return <TextField {...params} variant="standard" label={label} />;
        }}
        isOptionEqualToValue={(option, value) => option._id === value._id}
      />
      {error && <FormHelperText error>{error?.message}</FormHelperText>}
    </FormControl>
  );
};

export default MultipleAutocomplete;
