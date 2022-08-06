import { Add, Remove } from "@mui/icons-material";
import {
  Fab,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
} from "@mui/material";
import { Controller, useController, useFieldArray } from "react-hook-form";

const FieldArrayEpisodes = ({ control, name }) => {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
    formState: { errors },
  } = useController({
    name,
    control,
  });
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name,
    }
  );

  return (
    <>
      {fields.map((field, index) => {
        return (
          <div key={field.id} className="episode-form">
            <Controller
              control={control}
              name={`${name}.${index}.episodeNumber`}
              render={({ field }) => (
                <FormControl variant="standard">
                  <InputLabel>Episode Number</InputLabel>

                  <Input {...field} />
                  <FormHelperText error>{error?.message}</FormHelperText>
                </FormControl>
              )}
            />
            <Controller
              control={control}
              name={`${name}.${index}.title`}
              render={({ field }) => (
                <FormControl variant="standard">
                  <InputLabel>Episode title</InputLabel>

                  <Input {...field} />
                  <FormHelperText error>{error?.message}</FormHelperText>
                </FormControl>
              )}
            />
            <Controller
              control={control}
              name={`${name}.${index}.plot`}
              render={({ field }) => (
                <FormControl variant="standard">
                  <InputLabel>Episode plot</InputLabel>

                  <Input {...field} />
                  <FormHelperText error>{error?.message}</FormHelperText>
                </FormControl>
              )}
            />
            <Controller
              control={control}
              name={`${name}.${index}.thumbnail`}
              render={({ field }) => (
                <FormControl variant="standard">
                  <InputLabel>Episode thumbnail</InputLabel>

                  <Input {...field} />
                  <FormHelperText error>{error?.message}</FormHelperText>
                </FormControl>
              )}
            />
            <Controller
              control={control}
              name={`${name}.${index}.runtimeStr`}
              render={({ field }) => (
                <FormControl variant="standard">
                  <InputLabel>Episode runtime</InputLabel>

                  <Input {...field} />
                  <FormHelperText error>{error?.message}</FormHelperText>
                </FormControl>
              )}
            />
            <Controller
              control={control}
              name={`${name}.${index}.videoLink`}
              render={({ field }) => (
                <FormControl variant="standard">
                  <InputLabel>Episode video link</InputLabel>

                  <Input {...field} />
                  <FormHelperText error>{error?.message}</FormHelperText>
                </FormControl>
              )}
            />
          </div>
        );
      })}
      <Fab
        size="small"
        onClick={() =>
          append({
            episodeNumber: fields.length + 1,
            title: "",
            plot: "",
            thumbnail: "",
            runtimeStr: "",
            videoLink: "",
          })
        }
      >
        <Add />
      </Fab>
      <Fab size="small" onClick={() => remove(fields.length - 1)}>
        <Remove />
      </Fab>
    </>
  );
};

export default FieldArrayEpisodes;
