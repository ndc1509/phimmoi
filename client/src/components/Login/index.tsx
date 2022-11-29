import { authApi } from "@api/authApi";
import { yupResolver } from "@hookform/resolvers/yup";
import useWatchList from "@hooks/useWatchList";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
    Alert,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Checkbox,
    Chip,
    Divider,
    FilledInput,
    FormControl,
    FormControlLabel,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "@store/index";
import { authSelector } from "@store/reducers/authSlice";
import { Account } from "@types";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import "./Login.css";
import SocialLoginButton, { SocialPlatform } from "./SocialLoginButton";

const schema = yup.object({
    email: yup
        .string()
        .email("Please enter a valid email.")
        .required("Please enter a valid email."),
    password: yup
        .string()
        .min(4, "Your password must contain between 4 and 60 characters.")
        .max(60, "Your password must contain between 4 and 60 characters.")
        .required("Your password must contain between 4 and 60 characters."),
    rememberMe: yup.boolean(),
});

const Login = () => {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<Account>({ resolver: yupResolver(schema) });
    const authState = useAppSelector(authSelector);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    useWatchList();

    //Check login
    React.useEffect(() => {
        if (authState.isAuthenticated) navigate("/", { replace: true });
    }, [authState.isAuthenticated]);

    //Handle show passwords
    const [showPassword, setShowPassword] = React.useState<boolean>(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
    };

    //Handle click submit
    const onSubmit: SubmitHandler<Account> = (data) => {
        dispatch(authApi.login({ email: data.email, password: data.password }));
    };

    return (
        <div className="login-body">
            <Card className="login-card">
                <CardHeader className="login-card__header" title="Sign In" />
                <CardContent className="login-card__content">
                    {authState.errorMsg.login && (
                        <Alert icon={false} className="login-card__login-error">
                            {authState.errorMsg.login}
                        </Alert>
                    )}
                    <form onSubmit={handleSubmit(onSubmit)}>
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
                                                ? "login-card__input--error"
                                                : "login-card__input"
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
                                                ? "login-card__input--error"
                                                : "login-card__input"
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

                        <Button
                            fullWidth
                            className="login-card__login-btn"
                            variant="contained"
                            type="submit"
                        >
                            Sign In
                        </Button>

                        <div className="login-card__help">
                            <Controller
                                name="rememberMe"
                                control={control}
                                render={({ field }) => (
                                    <FormControlLabel
                                        label="Remember me"
                                        control={
                                            <Checkbox
                                                onChange={(e) =>
                                                    field.onChange(
                                                        e.target.checked
                                                    )
                                                }
                                                checked={Boolean(field.value)}
                                            />
                                        }
                                    />
                                )}
                            />
                            <Typography>
                                <Link className="help-anchor" to="/help">
                                    Need help?
                                </Link>
                            </Typography>
                        </div>
                    </form>
                </CardContent>
                <CardActions className="login-card__action">
                    <Typography className="login-card__sign-up">
                        {"Don't have an account? "}
                        <Link className="sign-up-anchor" to="/register">
                            Sign up now
                        </Link>
                        .
                    </Typography>

                    <Divider className="login-card__divider" flexItem>
                        <Chip label="OR" variant="outlined" size="small" />
                    </Divider>
                    <div className="login-card__social-login">
                        <SocialLoginButton platform={SocialPlatform.Facebook} />
                        <SocialLoginButton platform={SocialPlatform.Google} />
                    </div>
                </CardActions>
            </Card>
        </div>
    );
};

export default Login;
