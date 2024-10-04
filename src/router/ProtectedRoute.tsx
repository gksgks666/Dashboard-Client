import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useFetchFnDirectLogout, useTypedSelector } from "@/hooks";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const userId = useTypedSelector((state) => state.user.userId);
  const isAccessToken = localStorage.getItem("accessToken");
  const passing = userId && isAccessToken;

  if (!passing) useFetchFnDirectLogout();
  return passing ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
