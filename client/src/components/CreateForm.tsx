import React, { useState } from "react";
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
import { CloudinaryWidget } from "./CloudinaryWidget";

interface FoodFormProps {
  categories: string[];
}

const CreateForm: React.FC<FoodFormProps> = ({ categories }) => {
  const [foodTitle, setFoodTitle] = useState("");
  const [foodDescription, setFoodDescription] = useState("");
  const [setDate, setSetDate] = useState("");
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleImageUpload = (url: string) => {
    setImageUrl(url);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission logic
    console.log({ foodTitle, foodDescription, setDate, category, imageUrl });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <Typography variant="h4">Add New Food Item</Typography>
      <TextField
        label="Food Title"
        variant="outlined"
        value={foodTitle}
        onChange={(e) => setFoodTitle(e.target.value)}
        required
      />
      <TextField
        label="Food Description"
        variant="outlined"
        multiline
        rows={4}
        value={foodDescription}
        onChange={(e) => setFoodDescription(e.target.value)}
        required
      />
      <TextField
        label="Set Date"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={setDate}
        onChange={(e) => setSetDate(e.target.value)}
        required
      />
      <FormControl variant="outlined">
        <InputLabel id="category-label">Category</InputLabel>
        <Select
          labelId="category-label"
          value={category}
          onChange={(e) => setCategory(e.target.value as string)}
          label="Category"
          required
        >
          {categories.map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <CloudinaryWidget onUpload={handleImageUpload} />
      {imageUrl && (
        <img src={imageUrl} alt="Uploaded" style={{ maxWidth: "100%" }} />
      )}
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </Box>
  );
};

export default CreateForm;
