import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Container from "@mui/material/Container";

import CreateForm from "../components/forms/CreateForm";

import { RootState } from "../utils/types"; // Adjust the import path as needed

const categories = [
  "Set Menu 1",
  "Set Menu 2",
  "Set Menu 3",
  "Set Menu 4",
  "Set Menu 5",
];

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
