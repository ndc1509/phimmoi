import { authApi } from "@api/authApi";
import { yupResolver } from "@hookform/resolvers/yup";
import useWatchList from "@hooks/useWatchList";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
    Alert,
    Button,
    Card,
    CardContent,
    CardHeader,
    FilledInput,
    FormControl,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    Typography
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "@store/index";
import { authSelector } from "@store/reducers/authSlice";
import { NewAccount } from "@types";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import "./Register.css";

const schema = yup.object({
    username: yup.string().required("Username is required"),
    email: yup
        .string()
        .email("Please enter a valid email.")
        .required("Email is required."),
    password: yup
        .string()
        .min(4, "Your password must contain between 4 and 60 characters.")
        .max(60, "Your password must contain between 4 and 60 characters.")
        .required("Password is required."),
    confirmPassword: yup
        .string()
        .min(4, "Your password must contain between 4 and 60 characters.")
        .max(60, "Your password must contain between 4 and 60 characters.")
        .required("Confirm password is required.")
        .oneOf([yup.ref("password"), null], "Confirm password do not match."),
});

const Register = () => {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<NewAccount>({ resolver: yupResolver(schema) });

    const authState = useAppSelector(authSelector);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    useWatchList();

    //Check register
    React.useEffect(() => {
        if (authState.isAuthenticated) navigate("/", { replace: true });
    }, [authState.isAuthenticated]);

    //Handle show passwords
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
    };

    //Handle submit
    const onSubmit: SubmitHandler<NewAccount> = (data) => {
        dispatch(
            authApi.register({
                username: data.username,
                email: data.email,
                password: data.password,
                confirmPassword: data.confirmPassword,
            })
        );
        console.log(data);
    };

    return (
        <div className="register-body">
            <Card className="register-card">
                <CardHeader
                    className="register-card__header"
                    title="Sign Up"
                    titleTypographyProps={{
                        variant: "h4",
                        fontWeight: "bold",
                    }}
                />

                <CardContent className="register-card__content">
                    {authState.errorMsg.register && (
                        <Alert
                            icon={false}
                            className="register-card__register-error"
                        >
                            {authState.errorMsg.register}
                        </Alert>
                    )}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Controller
                            name="username"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <FormControl variant="filled" fullWidth>
                                    <InputLabel htmlFor="username">
                                        Username
                                    </InputLabel>
                                    <FilledInput
                                        className={
                                            errors.username
                                                ? "register-card__input--error"
                                                : "register-card__input"
                                        }
                                        fullWidth
                                        id="username"
                                        type="text"
                                        {...field}
                                    />
                                    {errors.username && (
                                        <FormHelperText>
                                            {errors.username.message}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            )}
                        />

                        <Controller
                            name="email"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <FormControl variant="filled" fullWidth>
                                    <InputLabel htmlFor="email">
                                        Email
                                    </InputLabel>
                                    <FilledInput
                                        className={
                                            errors.email
                                                ? "register-card__input--error"
                                                : "register-card__input"
                                        }
                                        fullWidth
                                        id="email"
                                        type="email"
                                        {...field}
                                    />
                                    {errors.email && (
                                        <FormHelperText>
                                            {errors.email.message}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            )}
                        />
                        <Controller
                            name="password"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <FormControl variant="filled" fullWidth>
                                    <InputLabel htmlFor="password">
                                        Password
                                    </InputLabel>
                                    <FilledInput
                                        className={
                                            errors.password
                                                ? "register-card__input--error"
                                                : "register-card__input"
                                        }
                                        fullWidth
                                        id="password"
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        {...field}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={
                                                        handleClickShowPassword
                                                    }
                                                    onMouseDown={
                                                        handleMouseDownPassword
                                                    }
                                                    edge="end"
                                                >
                                                    {showPassword ? (
                                                        <VisibilityOff />
                                                    ) : (
                                                        <Visibility />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                    {errors.password && (
                                        <FormHelperText>
                                            {errors.password.message}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            )}
                        />

                        <Controller
                            name="confirmPassword"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <FormControl variant="filled" fullWidth>
                                    <InputLabel htmlFor="confirmPassword">
                                        Confirm Password
                                    </InputLabel>
                                    <FilledInput
                                        className={
                                            errors.confirmPassword
                                                ? "register-card__input--error"
                                                : "register-card__input"
                                        }
                                        fullWidth
                                        id="confirmPassword"
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        {...field}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={
                                                        handleClickShowPassword
                                                    }
                                                    onMouseDown={
                                                        handleMouseDownPassword
                                                    }
                                                    edge="end"
                                                >
                                                    {showPassword ? (
                                                        <VisibilityOff />
                                                    ) : (
                                                        <Visibility />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                    {errors.confirmPassword && (
                                        <FormHelperText>
                                            {errors.confirmPassword.message}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            )}
                        />

                        <Button
                            fullWidth
                            className="register-card__register-btn"
                            variant="contained"
                            type="submit"
                        >
                            Sign Up
                        </Button>
                    </form>
                    <Typography className="register-card__sign-in">
                        {"Already have an account? "}
                        <Link to="/login">Sign in now</Link>.
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
};

export default Register;
