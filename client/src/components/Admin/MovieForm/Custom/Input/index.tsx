import { TextField } from "@mui/material";
import { useController } from "react-hook-form";

type CustomInputProps = {
    control: any;
    name: any;
    label: string;
};

const CustomInput = ({ control, name, label }: CustomInputProps) => {
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
            margin="dense"
            label={label}
            variant="standard"
        />
    );
};

export default CustomInput;
