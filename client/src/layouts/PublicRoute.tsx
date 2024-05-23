import React, { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

const PublicRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  return <main>{children}</main>;
};

export default PublicRoute;
