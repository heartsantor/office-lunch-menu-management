import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { Container, Box } from "@mui/material";

import { RootState } from "../utils/types"; // Adjust the import path as needed

import EmployeeTable from "../components/EmployeeTable";

const employeeData = [
  {
    serialNo: 1,
    employeeId: "E001",
    employeeName: "John Doe",
    foodTitle: "Pizza",
    foodDescription: "Cheese Pizza with extra toppings",
    foodImage: "https://via.placeholder.com/100", // Placeholder image
  },
  {
    serialNo: 2,
    employeeId: "E002",
    employeeName: "Jane Smith",
    foodTitle: "Burger",
    foodDescription: "Beef Burger with cheese",
    foodImage: "https://via.placeholder.com/100", // Placeholder image
  },
  // Add more employee data as needed
];

const ChoiceList = () => {
  const { user } = useSelector((state: RootState) => state.auth);

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
        <EmployeeTable data={employeeData} />
      </Box>
    </Container>
  );
};

export default ChoiceList;
