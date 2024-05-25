import React from "react";
import { size } from "lodash";
import { useDispatch, useSelector } from "react-redux";

import Container from "@mui/material/Container";

import TodayLunch from "../components/TodayLunch";
import MyLunch from "../components/MyLunch";
import LoadingSpinner from "../components/LoadingSpinner";

import { useGetAllMenuQuery } from "../store/features/admin/adminApi";
import { useGetEmployeeTodayMenuQuery } from "../store/features/employee/employeeApi";

import { RootState } from "../utils/types";

const Dashboard = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const {
    data: allMenuData,
    isLoading,
    isError,
    error,
  } = useGetAllMenuQuery({});
  const { data: employeeTodayData, isLoading: employeeIsLoading } =
    useGetEmployeeTodayMenuQuery(user?.id);
  console.log("🚀 ~ Dashboard ~ employeeTodayData:", employeeTodayData);

  return (
    <Container
      sx={{
        pt: { xs: 4, sm: 4 },
        pb: { xs: 8, sm: 16 },
      }}
    >
      {(() => {
        if (employeeIsLoading) {
          return <LoadingSpinner isLoading={true} />;
        }
        if (size(employeeTodayData)) {
          return <MyLunch data={employeeTodayData} />;
        }
        return <div>no found</div>;
      })()}

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
