import React, { useEffect } from "react";
import { size } from "lodash";
import { useDispatch, useSelector } from "react-redux";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import Container from "@mui/material/Container";

import TodayLunch from "../components/TodayLunch";
import MyLunch from "../components/MyLunch";
import LoadingSpinner from "../components/LoadingSpinner";

import {
  useGetAllMenuQuery,
  useLazyGetAllMenuByDateQuery,
} from "../store/features/admin/adminApi";
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

  const getTodayInBangladesh = () => {
    const now = new Date();
    const bangladeshTime = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Dhaka",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(now);

    return bangladeshTime;
  };

  const today = getTodayInBangladesh();

  const [
    triggerGetMenuTodayByDate,
    { data: getMenuTodayByDate, isLoading: TodayMenuIsLoading },
  ] = useLazyGetAllMenuByDateQuery();

  useEffect(() => {
    triggerGetMenuTodayByDate(today);
  }, [today, triggerGetMenuTodayByDate]);

  const filteredAllMenuData = allMenuData?.filter(
    (menuItem: any) => menuItem.date !== today
  );

  return (
    <Container
      sx={{
        pt: { xs: 4, sm: 4 },
        pb: { xs: 8, sm: 16 },
      }}
    >
      {user?.role === "employee" ? (
        <>
          {(() => {
            if (employeeIsLoading) {
              return <LoadingSpinner isLoading={true} />;
            }
            if (size(employeeTodayData)) {
              return <MyLunch data={employeeTodayData} />;
            }
            return (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignContent: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  py: 4,
                }}
              >
                <Typography variant="h5">
                  Not Yet select your today lunch
                </Typography>
                <Typography variant="body1">
                  please select from below
                </Typography>
              </Box>
            );
          })()}
        </>
      ) : null}

      {(() => {
        if (TodayMenuIsLoading) {
          return <LoadingSpinner isLoading={true} />;
        }
        if (size(getMenuTodayByDate)) {
          return (
            <TodayLunch
              data={getMenuTodayByDate}
              title="For Today Lunch Item"
              description={today}
            />
          );
        }
        return <div>no found</div>;
      })()}

      {user?.role === "admin" ? (
        <>
          {(() => {
            if (isLoading) {
              return <LoadingSpinner isLoading={true} />;
            }
            if (size(filteredAllMenuData)) {
              return (
                <TodayLunch
                  data={filteredAllMenuData}
                  title="Previous Day Menu"
                  description="previous menu items all are here"
                />
              );
            }
            return <div>no found</div>;
          })()}
        </>
      ) : null}
    </Container>
  );
};

export default Dashboard;
