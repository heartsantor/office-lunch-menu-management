import React from "react";
import Container from "@mui/material/Container";

import TodayLunch from "../components/TodayLunch";
import MyLunch from "../components/MyLunch";

const Dashboard = () => {
  return (
    <Container
      sx={{
        pt: { xs: 4, sm: 4 },
        pb: { xs: 8, sm: 16 },
      }}
    >
      <MyLunch />
      <TodayLunch />
    </Container>
  );
};

export default Dashboard;