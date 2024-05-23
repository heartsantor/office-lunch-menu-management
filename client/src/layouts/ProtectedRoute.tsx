import React, { ReactNode } from "react";
import NavBar from "../components/NavBar";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  return (
    <main>
      <NavBar />
      {children}
    </main>
  );
};

export default ProtectedRoute;
