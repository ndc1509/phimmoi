import { TextField } from "@mui/material";
import { useController } from "react-hook-form";
type TextAreaProps = {
    control: any;
    name: any;
    label: string;
};
const TextArea = ({ control, name, label }: TextAreaProps) => {
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
            variant="standard"
        />
    );
};

export default TextArea;
