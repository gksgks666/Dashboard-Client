import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useFetchFnDirectLogout, useTypedSelector } from "@/hooks";

interface PublicRouteProps {
  children: ReactNode;
}

const PublicRoute = ({ children }: PublicRouteProps) => {
  const userId = useTypedSelector((state) => state.user.userId);
  const isAccessToken = localStorage.getItem("accessToken");
  const passing = userId && isAccessToken;

  if (!passing) useFetchFnDirectLogout();
  return !passing ? children : <Navigate to="/" replace />;
};

export default PublicRoute;
