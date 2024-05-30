import React, { useState } from "react";
import { size } from "lodash";
import { useNavigate } from "react-router-dom";
import { toastAlert } from "../../utils/AppHelpers";
import {
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box,
  Typography,
} from "@mui/material";
import { CloudinaryWidget } from "../CloudinaryWidget";

import { useEditMenuItemByIdMutation } from "../../store/features/admin/adminApi";

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

interface FoodFormProps {
  categories: string[];
  item?: MenuData;
}

const EditForm: React.FC<FoodFormProps> = ({ categories, item }) => {
  const [editMenu, { isLoading }] = useEditMenuItemByIdMutation();

  const navigate = useNavigate();

  const [foodTitle, setFoodTitle] = useState(item?.title || "");
  const [foodDescription, setFoodDescription] = useState(
    item?.description || ""
  );
  const [setDate, setSetDate] = useState(item?.date || "");
  const [category, setCategory] = useState<string[]>(item?.category || []);
  const [imageUrl, setImageUrl] = useState(item?.img_url || "");

  const handleImageUpload = (url: string) => {
    setImageUrl(url);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const updatedData = {
      date: setDate,
      title: foodTitle,
      description: foodDescription,
      rating: 0,
      rating_amount: 0,
      price: 0,
      category: category,
      imgUrl: imageUrl,
    };

    if (size(updatedData)) {
      editMenu({ id: item?.menu_id, data: updatedData })
        .unwrap()
        .then((res) => {
          if (size(res)) {
            toastAlert("success", "Menu added successfully!");
            navigate("/dashboard");
          }
        })
        .catch((err) => toastAlert("error", err?.data?.error || err?.error));
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <Typography variant="h4">Add New Food Item</Typography>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Box sx={{ flex: 1 }}>
          <Box sx={{ width: "100%", mb: 1 }}>
            <TextField
              label="Food Title"
              variant="outlined"
              value={foodTitle}
              onChange={(e) => setFoodTitle(e.target.value)}
              required
              fullWidth
            />
          </Box>
          <Box sx={{ width: "100%", mb: 1 }}>
            <TextField
              label="Set Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={setDate}
              onChange={(e) => setSetDate(e.target.value)}
              required
              fullWidth
            />
          </Box>
          <Box sx={{ width: "100%" }}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="category-label">Set Menu</InputLabel>
              <Select
                labelId="category-label"
                value={category}
                onChange={(e) => setCategory([e.target.value as string])}
                label="Category"
                required
                fullWidth
              >
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>
        <TextField
          label="Food Description"
          variant="outlined"
          multiline
          rows={6}
          value={foodDescription}
          onChange={(e) => setFoodDescription(e.target.value)}
          required
          sx={{ flex: 1 }}
        />
      </Box>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Box sx={{ flex: 1 }}>
          <Box
            sx={{
              width: "100%",
              minHeight: "200px",
              background: "#EBEBEB",
              border: "1px solid #ccc",
              borderRadius: "4px",
              padding: "8px",
              maxWidth: "100%",
              marginBottom: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="Uploaded"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            ) : (
              <Typography variant="body2" sx={{ marginBottom: "16px" }}>
                No image uploaded
              </Typography>
            )}
          </Box>
        </Box>
        <Box>
          <CloudinaryWidget onUpload={handleImageUpload} />
        </Box>
      </Box>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={isLoading}
      >
        {isLoading ? "Updating" : "Update"}
      </Button>
    </Box>
  );
};

export default EditForm;
