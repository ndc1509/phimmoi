import { MenuItem, TextField } from "@mui/material";
import { useController } from "react-hook-form";
type CustomSelectProps = {
    options: any;
    control: any;
    name: any;
    label: string;
};
const CustomSelect = ({ options, control, name, label }: CustomSelectProps) => {
    const {
        field: { onChange, ref, value },
        fieldState: { error },
        // formState: { errors },
    } = useController({
        name,
        control,
    });

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
            variant="standard"
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
