import React, { ReactNode } from "react";
import NavBar from "../components/NavBar";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../utils/types"; // Adjust the import path as needed

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { accessToken, user } = useSelector((state: RootState) => state.auth);

  if (accessToken && (user?.role === "admin" || user?.role === "employee")) {
    return (
      <main>
        <NavBar />
        {children}
      </main>
    );
  }
  return <Navigate to="/" />;
};

export default ProtectedRoute;
