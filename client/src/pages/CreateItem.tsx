import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Container from "@mui/material/Container";

import CreateForm from "../components/CreateForm";

import { RootState } from "../utils/types"; // Adjust the import path as needed

const categories = ["Fruits", "Vegetables", "Dairy", "Meat"];

const CreateItem = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  if (user?.role === "employee") {
    return <Navigate to="/" />;
  }

  return (
    <Container
      sx={{
        pt: { xs: 4, sm: 4 },
        pb: { xs: 8, sm: 16 },
      }}
    >
      <CreateForm categories={categories} />
    </Container>
  );
};

export default CreateItem;
