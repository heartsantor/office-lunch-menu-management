import React, { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../utils/types"; // Adjust the import path as needed

interface ProtectedRouteProps {
  children: ReactNode;
}

const PublicRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { accessToken, user } = useSelector((state: RootState) => state.auth);

  if (accessToken) {
    if (user?.role === "admin" || user?.role === "employee") {
      return <Navigate to="/dashboard" />;
    }
    return <Navigate to="/notfound" />;
  }

  return <main>{children}</main>;
};

export default PublicRoute;
