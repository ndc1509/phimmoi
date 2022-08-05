import { Navigate } from "react-router-dom";
import Login from "../../components/Login";
import { useAppSelector } from "../../store";
import { authSelector } from "../../store/reducers/authSlice";

const LoginPage = () => {
  const authState = useAppSelector(authSelector);
  if (authState.isAuthenticated) return <Navigate to="/home" replace />;
  return <Login />;
};

export default LoginPage;
