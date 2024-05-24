import React from "react";
import { Container } from "@mui/material";
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
  return (
    <Container>
      <EmployeeTable data={employeeData} />
    </Container>
  );
};

export default ChoiceList;
