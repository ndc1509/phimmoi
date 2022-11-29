import {
    // getDataForAddingMovie,
    // postMovie,
    // putMovie,
    adminApi
} from "@api/adminApi";
import { yupResolver } from "@hookform/resolvers/yup";
import useAppSnackBar from "@hooks/useAppSnackBar";
import { Add, Refresh } from "@mui/icons-material";
import { Box, Button, Fab } from "@mui/material";
import { Country, Genre, Movie, Person } from "@types";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as yup from "yup";
import FieldArraySeasons from "./Custom/FieldArraySeasons";
import FieldArrayTrailer from "./Custom/FieldArrayTrailers";
import CustomInput from "./Custom/Input";
import MultipleAutocomplete from "./Custom/MultipleAutocomplete";
import CustomSelect from "./Custom/Select";
import TextArea from "./Custom/Textarea";
import "./MovieForm.css";

const validationSchema = yup.object({
    _id: yup.string().optional(),
    title: yup.string().required(),
    type: yup.string().required(),
    year: yup.number().min(1900).required(),
    runtimeStr: yup.string().optional(),
    plot: yup.string().required(),
    directors: yup.array().min(1).required(),
    stars: yup.array().min(1).required(),
    genres: yup.array().min(1).required(),
    countries: yup.array().min(1).required(),
    contentRating: yup.string().required(),
    ratings: yup
        .object()
        .shape({
            imDbRating: yup.number().min(0).max(10).optional(),
            userRating: yup.number().min(0).max(5).default(0).optional(),
        })
        .optional(),
    media: yup.object({
        image: yup.string().required(),
        logo: yup.string().required(),
        backdrop: yup.string().required(),
        previewVideo: yup.string().optional(),
        trailers: yup
            .array()
            .of(
                yup.object({
                    title: yup.string().required(),
                    videoLink: yup.string().required(),
                })
            )
            .optional(),
    }),
    movieInfo: yup
        .object({
            videoLink: yup.string(),
        })
        .optional(),
    tvSeriesInfo: yup
        .object({
            seasons: yup
                .array()
                .of(
                    yup
                        .object({
                            seasonId: yup.string(),
                            seasonNumber: yup.number().min(1),
                            title: yup.string(),
                            plot: yup.string(),
                            year: yup.number().min(1900),
                            totalEpisodes: yup.number().min(1),
                            episodes: yup.array().of(
                                yup
                                    .object({
                                        episodeId: yup.string(),
                                        episodeNumber: yup.number().min(1),
                                        title: yup.string(),
                                        plot: yup.string(),
                                        thumbnail: yup.string(),
                                        runtimeStr: yup.string(),
                                        videoLink: yup.string(),
                                    })
                                    .optional()
                            ),
                        })
                        .optional()
                )
                .optional(),
        })
        .optional(),
});

const defaultValues: Movie = {
    title: "",
    type: "movie" || "tvSeries",
    year: 2022,
    runtimeStr: "",
    plot: "",
    directors: [],
    stars: [],
    genres: [],
    countries: [],
    contentRating: "",
    ratings: {
        imDbRating: 0,
    },
    media: {
        image: "",
        logo: "",
        backdrop: "",
        previewVideo: "",
        trailers: [
            {
                title: "",
                videoLink: "",
            },
        ],
    },
    movieInfo: {
        videoLink: "",
    },
    tvSeriesInfo: {
        seasons: [
            {
                seasonNumber: 1,
                plot: "",
                title: "",
                totalEpisodes: 1,
                year: 2022,
                episodes: [
                    {
                        episodeNumber: 1,
                        title: "",
                        plot: "",
                        videoLink: "",
                        thumbnail: "",
                        runtimeStr: "",
                    },
                ],
            },
        ],
    },
};

type MovieFormProps = {
    values?: Movie | null;
};

const MovieForm = ({ values }: MovieFormProps) => {
    const methods = useForm({
        defaultValues: values || defaultValues,
        resolver: yupResolver(validationSchema),
    });
    const showSnackbar = useAppSnackBar();
    const [directorData, setDirectorData] = React.useState<Person[]>([]);
    const [actorData, setActorData] = React.useState<Person[]>([]);
    const [genresData, setGenresData] = React.useState<Genre[]>([]);
    const [countriesData, setCountriesData] = React.useState<Country[]>([]);
    const [type, setType] = React.useState<string>(methods.getValues().type);
    const watchType = methods.watch("type");
    const [isRefresh, setIsRefresh] = React.useState<boolean>(false);

    React.useEffect(() => {
        setType(methods.getValues().type);
    }, [methods, watchType]);

    const getData = React.useCallback(async () => {
        try {
            const data = await adminApi.getDataForAddingMovie();
            if (data) {
                const directors = data?.[0].directors;
                const actors = data?.[1].actors;
                const genres = data?.[2].genres;
                const countries = data?.[3].countries;
                setCountriesData(countries);
                setDirectorData(directors);
                setActorData(actors);
                setGenresData(genres);
            }
        } catch (error) {
            console.log(error);
        }
    }, []);

    React.useEffect(() => {
        getData();
    }, [getData, isRefresh]);

    const handleRefresh = () => {
        setIsRefresh((prev) => !prev);
    };

    const submitMovie = async (movie: Movie) => {
        try {
            const data = values
                ? await adminApi.putMovie(movie)
                : await adminApi.postMovie(movie);
            if (data.success) showSnackbar(data.msg, "success");
            else showSnackbar(data.msg, "error");
            return data;
        } catch (error) {
            console.log(error);
        }
    };

    const onSubmit = (data) => {
        console.log(data);
        submitMovie(data);
    };

    return (
        <div className="movie-form">
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Fab onClick={handleRefresh} size="small">
                    <Refresh />
                </Fab>
            </Box>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <div className="movie-form-container">
                        <div className="movie-form-wrapper">
                            <h3>General</h3>
                            <CustomInput
                                control={methods.control}
                                name="title"
                                label="Title"
                            />
                            <CustomSelect
                                options={[
                                    {
                                        value: "movie",
                                        label: "Movie",
                                    },
                                    {
                                        value: "tvSeries",
                                        label: "TV-Series",
                                    },
                                ]}
                                label="Type"
                                name="type"
                                control={methods.control}
                            />

                            <CustomInput
                                control={methods.control}
                                name="year"
                                label="Year"
                            />
                            <CustomInput
                                control={methods.control}
                                name="runtimeStr"
                                label="Runtime"
                            />
                            <TextArea
                                control={methods.control}
                                name="plot"
                                label="Plot"
                            />
                        </div>

                        <div className="movie-form-wrapper">
                            <MultipleAutocomplete
                                data={directorData}
                                control={methods.control}
                                name="directors"
                                label="Directors"
                            />
                            <MultipleAutocomplete
                                data={actorData}
                                control={methods.control}
                                name="stars"
                                label="Stars"
                            />

                            <Link to={"/admin/people"} target="_blank">
                                <Fab
                                    size="small"
                                    variant="extended"
                                    sx={{ margin: 1 }}
                                >
                                    <Add /> Person
                                </Fab>
                            </Link>

                            <MultipleAutocomplete
                                data={genresData}
                                control={methods.control}
                                name="genres"
                                label="Genres"
                            />
                            <MultipleAutocomplete
                                data={countriesData}
                                control={methods.control}
                                name="countries"
                                label="Countries"
                            />
                        </div>
                        <div className="movie-form-wrapper">
                            <h3>Rating</h3>
                            <CustomInput
                                control={methods.control}
                                label="IMDB Rating"
                                name="ratings.imDbRating"
                            />
                            <CustomInput
                                control={methods.control}
                                label="Content Rating"
                                name="contentRating"
                            />
                        </div>
                        <div className="movie-form-wrapper">
                            <h3>Media</h3>
                            <CustomInput
                                control={methods.control}
                                label="Main poster"
                                name="media.image"
                            />
                            <CustomInput
                                control={methods.control}
                                label="Logo"
                                name="media.logo"
                            />
                            <CustomInput
                                control={methods.control}
                                label="Backdrop"
                                name="media.backdrop"
                            />
                            <CustomInput
                                control={methods.control}
                                label="Preview video"
                                name="media.previewVideo"
                            />
                        </div>
                        <div className="movie-form-wrapper">
                            <h3>Trailers</h3>
                            <FieldArrayTrailer
                                control={methods.control}
                                name="media.trailers"
                            />
                        </div>
                        {type === "movie" ? (
                            <div className="movie-form-wrapper seasons">
                                <CustomInput
                                    control={methods.control}
                                    label="Movie link"
                                    name="movieInfo.videoLink"
                                />
                            </div>
                        ) : (
                            <div className="movie-form-wrapper seasons">
                                <h3>Seasons</h3>
                                <FieldArraySeasons
                                    control={methods.control}
                                    name="tvSeriesInfo.seasons"
                                />
                            </div>
                        )}
                    </div>

                    <Button
                        className="movie-form-submit"
                        variant="contained"
                        type="submit"
                    >
                        Submit
                    </Button>
                </form>
            </FormProvider>
        </div>
    );
};

export default MovieForm;
