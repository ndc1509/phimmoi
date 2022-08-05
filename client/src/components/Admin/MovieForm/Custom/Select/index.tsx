import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
} from "@mui/material";
import React from "react";
import { Control, useController } from "react-hook-form";


const CustomSelect = ({ options, control, name, label }) => {
    const {
        field: { onChange, ref, value },
        fieldState: { error },
        // formState: { errors },
    } = useController({
        name,
        control,
    });
    // const [value, setValue] = React.useState(field.value);

    return (
        <TextField
            onChange={onChange}
            select
            value={value}
            defaultValue={options[0].value}
            name={name}
            margin="dense"
            inputRef={ref}
            label={label}
            error={error ? true : false}
            helperText={error?.message}
            variant='standard'
        >
            {options.map((opt) => (
                <MenuItem value={opt.value} key={opt.value}>
                    {opt.label}
                </MenuItem>
            ))}
        </TextField>
    );
};

export default CustomSelect;
