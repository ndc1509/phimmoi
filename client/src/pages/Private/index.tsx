import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../store";
import { authSelector } from "../../store/reducers/authSlice";

const PrivatePage = ({ children }) => {
  const authState = useAppSelector(authSelector);
  if (authState.isAuthenticated && authState.user?.role === 'admin') return children;
  return <Navigate to="/403" replace />;
};

export default PrivatePage;
