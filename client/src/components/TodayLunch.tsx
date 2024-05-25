import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

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
  title: string;
  description: string;
}

const TodayLunch: React.FC<EmployeeTableProps> = ({
  data,
  title,
  description,
}) => {
  return (
    <Box
      sx={{
        width: "100%",
        mb: 4,
      }}
    >
      <Box
        sx={{
          width: "100%",
          textAlign: "left",
          mb: 3,
        }}
      >
        <Typography component="h1" variant="h5" color="text.primary">
          {title}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {description}
        </Typography>
        <Divider />
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
