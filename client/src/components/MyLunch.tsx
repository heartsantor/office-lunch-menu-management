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

const MyLunch = () => {
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
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          sx={{ display: "flex", pb: { xs: 2, sm: 4 } }}
        >
          <MyLunchItem />
        </Grid>
      </Grid>
    </Box>
  );
};

export default MyLunch;
