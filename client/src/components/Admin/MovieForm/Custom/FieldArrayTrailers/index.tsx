import { Add, Remove } from "@mui/icons-material";
import { Fab, FormControl, Input, InputLabel } from "@mui/material";
import { Controller, useFieldArray } from "react-hook-form";

const FieldArrayTrailer = ({ control, name }) => {
    const { fields, append, prepend, remove, swap, move, insert } =
        useFieldArray({
            control,
            name,
        });

    return (
        <>
            {fields.map((field, index) => {
                return (
                    <div key={field.id}>
                        <Controller
                            control={control}
                            name={`${name}.${index}.title`}
                            render={({ field }) => (
                                <FormControl variant="standard">
                                    <InputLabel>Title</InputLabel>

                                    <Input {...field} />
                                    {/* <FormHelperText error>
                                        {errors.trailers.[]}
                                    </FormHelperText> */}
                                </FormControl>
                            )}
                        />
                        <Controller
                            control={control}
                            name={`${name}.${index}.videoLink`}
                            render={({ field }) => (
                                <FormControl variant="standard">
                                    <InputLabel>Video Link</InputLabel>

                                    <Input {...field} />
                                    {/* <FormHelperText error>
                                        {error?.message}
                                    </FormHelperText> */}
                                </FormControl>
                            )}
                        />
                    </div>
                );
            })}
            <Fab
                size="small"
                onClick={() => append({ title: "", videoLink: "" })}
            >
                <Add />
            </Fab>
            <Fab size="small" onClick={() => remove(fields.length - 1)}>
                <Remove />
            </Fab>
        </>
    );
};

export default FieldArrayTrailer;
