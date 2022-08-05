import { Add, Remove } from "@mui/icons-material";
import {
  Fab,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
} from "@mui/material";
import React from "react";
import { Controller, useController, useFieldArray } from "react-hook-form";
import FieldArrayEpisodes from "../FieldArrayEpisodes";

const FieldArraySeasons = ({ control, name }) => {
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
  React.useEffect(() => {
    console.log(fields);
  });
  return (
    <>
      {fields.map((field, index) => {
        return (
          <div key={field.id} className="season">
            <h3>Season {index + 1}</h3>
            <Controller
              control={control}
              name={`${name}.${index}.seasonNumber`}
              render={({ field }) => (
                <FormControl variant="standard">
                  <InputLabel>Season number</InputLabel>

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
                  <InputLabel>Title</InputLabel>

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
                  <InputLabel>Plot</InputLabel>

                  <Input {...field} />
                  <FormHelperText error>{error?.message}</FormHelperText>
                </FormControl>
              )}
            />
            <Controller
              control={control}
              name={`${name}.${index}.year`}
              render={({ field }) => (
                <FormControl variant="standard">
                  <InputLabel>Year</InputLabel>

                  <Input {...field} />
                  <FormHelperText error>{error?.message}</FormHelperText>
                </FormControl>
              )}
            />
            <Controller
              control={control}
              name={`${name}.${index}.totalEpisodes`}
              render={({ field }) => (
                <FormControl variant="standard">
                  <InputLabel>Total episodes</InputLabel>

                  <Input {...field} />
                  <FormHelperText error>{error?.message}</FormHelperText>
                </FormControl>
              )}
            />
            <FieldArrayEpisodes
              control={control}
              name={`${name}.${index}.episodes`}
            />
          </div>
        );
      })}
      <Fab
        size="small"
        onClick={() =>
          append({
            seasonNumber: fields.length + 1,
            title: "",
            plot: "",
            year: 2022,
            totalEpisodes: 1,
            episodes: [
              {
                episodeNumber: 1,
                title: "",
                plot: "",
                thumbnail: "",
                runtimeStr: "",
                videoLink: "",
              },
            ],
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

export default FieldArraySeasons;
