import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation,Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { alpha } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import ListItemButton from "@mui/material/ListItemButton";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import EngineeringIcon from "@mui/icons-material/Engineering";
import NavItem from "./NavItem";

import { NAV, HEADER } from "../../common/configLayout";
import { useResponsive } from "../../hooks/useResponsive";
import { RootState } from "../../utils/types";
import { bgBlur } from "../../theme/css";

import { NavItemConfig } from "./type";

const navConfig: NavItemConfig[] = [
  {
    title: "Create Food Item",
    path: "/create-item",
    icon: NoteAddIcon,
  },
  {
    title: "Food Choices List",
    path: "/choice-list",
    icon: RestaurantIcon,
  },
  {
    title: "Employee List",
    path: "/employee-list",
    icon: EngineeringIcon,
  },
];

interface NavProps {
  openNav: boolean;
  onCloseNav: () => void;
}

const Nav: React.FC<NavProps> = ({ openNav, onCloseNav }) => {
 const { user } = useSelector((state: RootState) => state.auth);

  const theme = useTheme();
  const upLg = useResponsive("up", "lg");
  const { pathname } = useLocation();

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderMenu = (
    <Stack component="nav" spacing={0.5}>
      {navConfig.map((item) => (
        <NavItem key={item.title} item={item} />
      ))}
    </Stack>
  );

  const renderContent = (
    <Box
      sx={{
        height: 1,
      }}
    >
      <Box
        sx={{
          height: HEADER.H_DESKTOP,
          background: theme.palette.grey[300],
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h6"
          component={Link}
          to="/dashboard"
          noWrap
          sx={{
            textDecoration: "none",
            color: "text.secondary",
          }}
        >
          MyLunch
        </Typography>
      </Box>
      {renderMenu}

      <Box sx={{ flexGrow: 1 }} />
    </Box>
  );

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.WIDTH },
      }}
    >
      {upLg ? (
        <Box
          sx={{
            height: 1,
            position: "fixed",
            width: NAV.WIDTH,
            background: theme.palette.grey[600],
            // borderRight: (theme) => `solid 1px ${theme.palette.divider}`,
          }}
        >
          {renderContent}
        </Box>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          PaperProps={{
            sx: {
              width: NAV.WIDTH,
              background: theme.palette.grey[600],
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
};

export default Nav;
