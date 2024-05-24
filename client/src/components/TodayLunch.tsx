import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import LunchItem from "./LunchItem";

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

const TodayLunch: React.FC<EmployeeTableProps> = ({ data }) => {
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
        {data?.map((item) => (
          <Grid
            key={item.menu_id}
            item
            xs={12}
            sm={6}
            md={4}
            sx={{ display: "flex" }}
          >
            <LunchItem item={item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TodayLunch;
