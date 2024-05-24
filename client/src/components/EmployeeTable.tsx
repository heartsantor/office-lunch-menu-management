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
  category: string;
  date: string;
  description: string;
  id: string;
  img_url: string;
  menuid: number;
  title: string;
  userid: number;
  username: string;
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
            {/* <TableCell>Employee ID</TableCell> */}
            <TableCell>Employee Name</TableCell>
            <TableCell>Food Title</TableCell>
            <TableCell>Food Description</TableCell>
            <TableCell>Food Image</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell>{employee.id}</TableCell>
              {/* <TableCell>{employee.userid}</TableCell> */}
              <TableCell>{employee.username}</TableCell>
              <TableCell>{employee.title}</TableCell>
              <TableCell>{employee.description}</TableCell>
              <TableCell>
                <img
                  src={employee.img_url}
                  alt={employee.title}
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
