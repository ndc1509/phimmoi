import Register from "@components/Register";
import { useAppSelector } from "@store/index";
import { authSelector } from "@store/reducers/authSlice";
import { Navigate } from "react-router-dom";

const RegisterPage = () => {
    const authState = useAppSelector(authSelector);
    if (authState.isAuthenticated) return <Navigate to="/" replace />;
    return <Register />;
};

export default RegisterPage;
