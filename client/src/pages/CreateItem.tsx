import React from "react";
import Container from "@mui/material/Container";

import CreateForm from "../components/CreateForm";

const categories = ["Fruits", "Vegetables", "Dairy", "Meat"];

const CreateItem = () => {
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
