import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { size } from "lodash";
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
  isLoading: boolean;
}

const MyLunch: React.FC<EmployeeTableProps> = ({ data, isLoading = true }) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        What would eat today ?
      </Typography>
      {(() => {
        if (isLoading) {
          return (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={6} sx={{ display: "flex" }}>
                <MyLunchItem isSkeleton={isLoading} />
              </Grid>
            </Grid>
          );
        }
        if (size(data)) {
          return (
            <Grid container spacing={2}>
              {data?.map((item) => (
                <Grid
                  key={item.menu_id}
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  sx={{ display: "flex" }}
                >
                  <MyLunchItem item={item} />
                </Grid>
              ))}
            </Grid>
          );
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
            <Typography variant="body1">please select from below</Typography>
          </Box>
        );
      })()}
    </Box>
  );
};

export default MyLunch;
