import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { size } from "lodash";

import { Container, Box, Typography } from "@mui/material";

import LoadingSpinner from "../components/LoadingSpinner";
import EditForm from "../components/forms/EditForm";
import { useGetSingleMenuByIdQuery } from "../store/features/admin/adminApi";

import { RootState } from "../utils/types"; // Adjust the import path as needed

const categories = [
  "Set Menu 1",
  "Set Menu 2",
  "Set Menu 3",
  "Set Menu 4",
  "Set Menu 5",
];

const EditItem = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  let { itemId } = useParams();

  const {
    data: getSingleMEnuData,
    isLoading,
    isError,
    error,
  } = useGetSingleMenuByIdQuery(itemId);
  console.log("🚀 ~ EditItem ~ getSingleMEnuData:", getSingleMEnuData?.data);
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
      {(() => {
        if (isLoading) {
          return <LoadingSpinner isLoading={true} />;
        }
        if (size(getSingleMEnuData?.data)) {
          return (
            <EditForm categories={categories} item={getSingleMEnuData?.data} />
          );
        }
        return (
          <Box
            sx={{
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
              py: 16,
            }}
          >
            <Typography variant="h5">No Data Available</Typography>
          </Box>
        );
      })()}
    </Container>
  );
};

export default EditItem;
