import React, { ReactNode, useState } from "react";
// import NavBar from "../components/NavBar";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Box from "@mui/material/Box";

import { RootState } from "../utils/types"; // Adjust the import path as needed

import Main from "./panel/Main";
import Nav from "../components/nav/Nav";
import Header from "../components/header/Header";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { accessToken, user } = useSelector((state: RootState) => state.auth);
  const [openNav, setOpenNav] = useState(false);

  if (accessToken && (user?.role === "admin" || user?.role === "employee")) {
    return (
      <>
        <Header onOpenNav={() => setOpenNav(true)} />
        <Box
          sx={{
            minHeight: 1,
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
          }}
        >
          {user?.role === "admin" ? (
            <Nav openNav={openNav} onCloseNav={() => setOpenNav(false)} />
          ) : null}

          <Main>
            {/* <NavBar /> */}
            {children}
          </Main>
        </Box>
      </>
    );
  }
  return <Navigate to="/" />;
};

export default ProtectedRoute;
