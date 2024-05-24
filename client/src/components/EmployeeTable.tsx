import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

interface EmployeeData {
  serialNo: number;
  employeeId: string;
  employeeName: string;
  foodTitle: string;
  foodDescription: string;
  foodImage: string;
}

interface EmployeeTableProps {
  data: EmployeeData[];
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({ data }) => {
  return (
    <TableContainer component={Paper}>
      <Typography variant="h6" component="div" sx={{ padding: 2 }}>
        Employee Food Details
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Serial No</TableCell>
            <TableCell>Employee ID</TableCell>
            <TableCell>Employee Name</TableCell>
            <TableCell>Food Title</TableCell>
            <TableCell>Food Description</TableCell>
            <TableCell>Food Image</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((employee) => (
            <TableRow key={employee.serialNo}>
              <TableCell>{employee.serialNo}</TableCell>
              <TableCell>{employee.employeeId}</TableCell>
              <TableCell>{employee.employeeName}</TableCell>
              <TableCell>{employee.foodTitle}</TableCell>
              <TableCell>{employee.foodDescription}</TableCell>
              <TableCell>
                <img
                  src={employee.foodImage}
                  alt={employee.foodTitle}
                  style={{ width: "100px" }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EmployeeTable;
