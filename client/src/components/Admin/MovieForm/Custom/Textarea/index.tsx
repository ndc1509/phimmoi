import { TextField } from "@mui/material";
import React from "react";
import { useController } from "react-hook-form";

const TextArea = ({ control, name, label }) => {
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
        <TextField
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            name={name}
            inputRef={ref}
            error={error ? true : false}
            helperText={error?.message}
            multiline
            rows={5}
            label={label}
            variant='standard'
        />
    );
};

export default TextArea;
