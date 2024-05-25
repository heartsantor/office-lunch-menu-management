import React from "react";
import { useSelector } from "react-redux";
import { toastAlert } from "../utils/AppHelpers";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Delete from "@mui/icons-material/Delete";

import { useDeleteMenuMutation } from "../store/features/admin/adminApi";
import { useAddEmployeeChoiceMutation } from "../store/features/employee/employeeApi";

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

  const [deleteMenu, { isLoading }] = useDeleteMenuMutation({});
  const [addEmployeeChoice, { isLoading: isEmployeeLoading }] =
    useAddEmployeeChoiceMutation({});

  const handleDeleteMenu = (menuId: number) => {
    if (menuId) {
      deleteMenu(menuId)
        .unwrap()
        .then((res) => {
          toastAlert("success", "Deleted Menu!");
        })
        .catch((err) => {
          toastAlert("error", err?.data || err?.error);
        });
    }
  };
  const handleAddEmployeeChoice = (data: any) => {
    if (data) {
      addEmployeeChoice(data)
        .unwrap()
        .then((res) => {
          toastAlert("success", res);
        })
        .catch((err) => {
          console.log("🚀 ~ handleAddEmployeeChoice ~ err:", err);
          toastAlert("error", err?.data?.error || err?.error);
        });
    }
  };

  return (
    <Card
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%", // Ensure the card takes full height of the container
      }}
    >
      <div>
        <CardHeader title={item.title} subheader={formatDate(item.date)} />
        <CardMedia
          component="img"
          height="194"
          image={item.img_url}
          alt="Paella dish"
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="body2" color="text.secondary">
            {item.description}
          </Typography>
        </CardContent>
      </div>
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
            <IconButton
              aria-label="share"
              disabled={isLoading}
              onClick={() => handleDeleteMenu(item.menu_id)}
            >
              <Delete />
            </IconButton>
          </>
        ) : (
          <>
            <Button
              variant="outlined"
              size="small"
              aria-label="add to favorites"
              disabled={isEmployeeLoading}
              onClick={() =>
                handleAddEmployeeChoice({
                  userId: user?.id,
                  menuId: item.menu_id,
                  userName: user?.name,
                })
              }
            >
              Choose
            </Button>
            <div></div>
          </>
        )}
      </CardActions>
    </Card>
  );
};

export default LunchItem;
