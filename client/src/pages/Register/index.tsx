import { Navigate } from "react-router-dom";
import Register from "../../components/Register";
import { useAppSelector } from "../../store";
import { authSelector } from "../../store/reducers/authSlice";

const RegisterPage = () => {
  const authState = useAppSelector(authSelector);
  if (authState.isAuthenticated) return <Navigate to="/" replace />;
  return <Register />;
};

export default RegisterPage;
