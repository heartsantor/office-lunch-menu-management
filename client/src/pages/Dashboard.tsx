import React from "react";
import { size } from "lodash";

import Container from "@mui/material/Container";

import TodayLunch from "../components/TodayLunch";
import MyLunch from "../components/MyLunch";
import LoadingSpinner from "../components/LoadingSpinner";

import { useGetAllMenuQuery } from "../store/features/admin/adminApi";

const Dashboard = () => {
  const {
    data: allMenuData,
    isLoading,
    isError,
    error,
  } = useGetAllMenuQuery({});

  return (
    <Container
      sx={{
        pt: { xs: 4, sm: 4 },
        pb: { xs: 8, sm: 16 },
      }}
    >
      <MyLunch />
      {(() => {
        if (isLoading) {
          return <LoadingSpinner isLoading={true} />;
        }
        if (size(allMenuData)) {
          return <TodayLunch data={allMenuData} />;
        }
        return <div>no found</div>;
      })()}
    </Container>
  );
};

export default Dashboard;
