import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

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
  item: MenuData;
}

const MyLunchItem: React.FC<LunchItemProps> = ({ item }) => {
  return (
    <Card sx={{ display: "flex" }}>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={item.img_url}
        alt="Live from space album cover"
      />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            {item.title}
          </Typography>
        </CardContent>
        <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
          <Typography variant="body2" color="text.secondary">
            {item.description}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};

export default MyLunchItem;
