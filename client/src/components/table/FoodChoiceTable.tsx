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

import { formatDate } from "../../utils/formatDate";

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

interface FoodChoiceTableProps {
  data: EmployeeData[];
}

const FoodChoiceTable: React.FC<FoodChoiceTableProps> = ({ data }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Serial No</TableCell>
            <TableCell>Menu ID</TableCell>
            <TableCell>Employee Name</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Food Title</TableCell>
            <TableCell>Food Description</TableCell>
            <TableCell>Food Image</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((employee, i) => (
            <TableRow key={i}>
              <TableCell>{i + 1}</TableCell>
              <TableCell>{employee.menuid}</TableCell>
              <TableCell>{employee.username}</TableCell>
              <TableCell>{formatDate(employee.date)}</TableCell>
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

export default FoodChoiceTable;
