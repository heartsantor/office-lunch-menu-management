import React from "react";
import { useLocation, Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { alpha } from "@mui/material/styles";
import ListItemButton from "@mui/material/ListItemButton";
import Box from "@mui/material/Box";

import { NavItemConfig } from "./type"; // Ensure this type is correctly defined in your type file

interface NavItemProps {
  item: NavItemConfig;
}

const NavItem: React.FC<NavItemProps> = ({ item }) => {
  const theme = useTheme();
  const location = useLocation();

  const active = item.path === location.pathname;
  const Icon = item.icon;
  return (
    <ListItemButton
      component={Link}
      to={item.path}
      sx={{
        minHeight: 50,
        borderRadius: 0,
        typography: "body2",
        color: theme.palette.grey[300],
        textTransform: "capitalize",
        fontWeight: "fontWeightBold",
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        py: 3,
        ...(active && {
         color: theme.palette.grey[100],
          fontWeight: "fontWeightSemiBold",
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.2),
          "&:hover": {
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
          },
        }),
      }}
    >
      <Box component="span" sx={{ width: 35, height: 35 }}>
        <Icon sx={{ width: 35, height: 35 }} />
      </Box>

      <Box component="span">{item.title} </Box>
    </ListItemButton>
  );
};

export default NavItem;
