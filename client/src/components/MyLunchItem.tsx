import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

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

interface LunchItemProps {
  item?: MenuData;
  isSkeleton?: boolean;
}

const MyLunchItem: React.FC<LunchItemProps> = ({ item, isSkeleton }) => {
  return (
    <Card sx={{ display: "flex", width: "100%", borderRadius: 2 }}>
      {isSkeleton ? (
        <Skeleton
          variant="rectangular"
          sx={{ minWidth: 150, minHeight: 180 }}
        />
      ) : (
        <CardMedia
          component="img"
          sx={{ minWidth: 150 }}
          image={item?.img_url}
          alt="Live from space album cover"
        />
      )}
      {isSkeleton ? (
        <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
          <CardContent sx={{ flex: "1 0 auto", px: 2, pt: 2, pb: 1 }}>
            <Skeleton variant="text" component="h1" width="80%" />
          </CardContent>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              p: 2,
              width: "100%",
            }}
          >
            <Stack spacing={1} sx={{ width: "100%" }}>
              <Skeleton variant="text" component="h5" width="90%" />
              <Skeleton variant="text" component="h5" width="80%" />
              <Skeleton variant="text" component="h5" width="60%" />
            </Stack>
          </Box>
        </Box>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto", px: 2, pt: 2, pb: 1 }}>
            <Typography component="div" variant="h5">
              {item?.title}
            </Typography>
          </CardContent>
          <Box sx={{ display: "flex", alignItems: "center", px: 2, pb: 2 }}>
            <Typography variant="body2" color="text.secondary">
              {item?.description}
            </Typography>
          </Box>
        </Box>
      )}
    </Card>
  );
};

export default MyLunchItem;
