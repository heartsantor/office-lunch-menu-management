import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import Delete from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { RootState } from "../utils/types";
import { formatDate } from "../utils/formatDate";
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

const LunchItem: React.FC<LunchItemProps> = ({ item }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  return (
    <Card
      sx={{
        width: "100%",
      }}
    >
      <CardHeader title={item.title} subheader={formatDate(item.date)} />
      <CardMedia
        component="img"
        height="194"
        image={item.img_url}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {item.description}
        </Typography>
      </CardContent>
      <CardActions
        disableSpacing
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {user?.role === "admin" ? (
          <>
            <div></div>
            <IconButton aria-label="share">
              <Delete />
            </IconButton>
          </>
        ) : (
          <>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <div></div>
          </>
        )}
      </CardActions>
    </Card>
  );
};

export default LunchItem;
