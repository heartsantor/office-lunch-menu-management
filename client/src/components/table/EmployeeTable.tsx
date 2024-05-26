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
  IconButton,
} from "@mui/material";

import Delete from "@mui/icons-material/Delete";
import { toastAlert } from "../../utils/AppHelpers";

import { useDeleteEmployeeMutation } from "../../store/features/admin/adminApi";

interface EmployeeData {
  email: string;
  name: string;
  id: number;
}

interface EmployeeTableProps {
  data: EmployeeData[];
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({ data }) => {
  const [deleteEmployee, { isLoading }] = useDeleteEmployeeMutation({});

  const handleDeleteMenu = (menuId: number) => {
    if (menuId) {
      deleteEmployee(menuId)
        .unwrap()
        .then((res) => {
          toastAlert("success", "Deleted Menu!");
        })
        .catch((err) => {
          toastAlert("error", err?.data || err?.error);
        });
    }
  };

  return (
    <TableContainer component={Paper}>
      <Typography variant="h6" component="div" sx={{ padding: 2 }}>
        Employee List
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Serial No</TableCell>
            <TableCell>Employee Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((employee, i) => (
            <TableRow key={i}>
              <TableCell>{i + 1}</TableCell>
              <TableCell>{employee.name}</TableCell>
              <TableCell>{employee.email}</TableCell>
              <TableCell>
                <IconButton
                  aria-label="share"
                  disabled={isLoading}
                  onClick={() => handleDeleteMenu(employee.id)}
                >
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EmployeeTable;
