import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

import LunchItem from "./LunchItem";

const TodayLunch = () => {
  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Box
        sx={{
          width: { sm: "100%", md: "60%" },
          textAlign: "left",
          // margin: "0 auto",
        }}
      >
        <Typography component="h2" variant="h4" color="text.primary">
          Todays Lunch List
        </Typography>
        <Typography variant="body1" color="text.secondary">
          You can select only one lunch today
        </Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4} sx={{ display: "flex" }}>
          <LunchItem />
        </Grid>
        <Grid item xs={12} sm={6} md={4} sx={{ display: "flex" }}>
          <LunchItem />
        </Grid>
        <Grid item xs={12} sm={6} md={4} sx={{ display: "flex" }}>
          <LunchItem />
        </Grid>
        <Grid item xs={12} sm={6} md={4} sx={{ display: "flex" }}>
          <LunchItem />
        </Grid>
      </Grid>
    </Box>
  );
};

export default TodayLunch;
