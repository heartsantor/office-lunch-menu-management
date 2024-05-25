import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import MyLunchItem from "./MyLunchItem";

interface MenuData {
  menu_id: number;
  date: string;
  title: string;
  description: string;
  rating: string;
  rating_amount: number;
  price: string;
  category: string[];
  img_url: string;
}

interface EmployeeTableProps {
  data: MenuData[];
}

const MyLunch: React.FC<EmployeeTableProps> = ({ data }) => {
  return (
    <Box
      p={3}
      component={Paper}
      variant="outlined"
      sx={{ background: "#EBEBEB" }}
    >
      <Typography variant="h6" gutterBottom>
        My Lunch Item
      </Typography>
      <Grid container spacing={2}>
        {data?.map((item) => (
          <Grid
            key={item.menu_id}
            item
            xs={12}
            sm={6}
            md={4}
            sx={{ display: "flex" }}
          >
            <MyLunchItem item={item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MyLunch;
