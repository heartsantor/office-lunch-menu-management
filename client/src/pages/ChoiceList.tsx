import React, { useEffect } from "react";
import { toastAlert } from "../utils/AppHelpers";
import { size } from "lodash";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { Container, Box } from "@mui/material";

import { RootState } from "../utils/types"; // Adjust the import path as needed

import EmployeeTable from "../components/EmployeeTable";
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
  console.log("🚀 ~ Dashboard ~ choiceList:", choiceList);

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
        }}
      >
        {(() => {
          if (isLoading) {
            return <LoadingSpinner isLoading={true} />;
          }
          if (size(choiceList)) {
            return <EmployeeTable data={choiceList} />;
          }
          return <div>no found</div>;
        })()}
      </Box>
    </Container>
  );
};

export default ChoiceList;
