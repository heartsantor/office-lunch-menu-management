import { useEffect } from "react";
import { toastAlert } from "../utils/AppHelpers";
import { size } from "lodash";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { Container, Box, Typography } from "@mui/material";

import { RootState } from "../utils/types"; // Adjust the import path as needed

import FoodChoiceTable from "../components/table/FoodChoiceTable";
import LoadingSpinner from "../components/LoadingSpinner";

import { useGetEmployeeChoiceListQuery } from "../store/features/admin/adminApi";

import { FetchBaseQueryError, SerializedError } from "../utils/types";

const ChoiceList = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const {
    data: choiceList,
    isLoading,
    isError,
    error,
  } = useGetEmployeeChoiceListQuery({});

  // Type guard functions
  function isFetchBaseQueryError(error: any): error is FetchBaseQueryError {
    return error && typeof error.status === "number" && "data" in error;
  }

  function isSerializedError(error: any): error is SerializedError {
    return error && typeof error.message === "string";
  }

  useEffect(() => {
    if (isError) {
      let errorMessage = "An unknown error occurred";

      if (error) {
        if (isFetchBaseQueryError(error)) {
          // Handle FetchBaseQueryError
          errorMessage = error.data
            ? JSON.stringify(error.data)
            : `Status: ${error.status}`;
        } else if (isSerializedError(error)) {
          // Handle SerializedError
          errorMessage = error.message;
        }
      }

      toastAlert("error", errorMessage);
    }
  }, [error, isError]);

  if (user?.role === "employee") {
    return <Navigate to="/" />;
  }
  return (
    <Container>
      <Box
        sx={{
          mt: 4,
          mb: 4,
        }}
      >
        {(() => {
          if (isLoading) {
            return <LoadingSpinner isLoading={true} />;
          }
          if (size(choiceList)) {
            return (
              <Box>
                <Typography variant="h6" component="div" sx={{ py: 2, px: 0 }}>
                  Food Choices List
                </Typography>
                <FoodChoiceTable data={choiceList} />
              </Box>
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
      </Box>
    </Container>
  );
};

export default ChoiceList;
