import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";

import { RootState } from "../../utils/types";

import { HEADER, NAV } from "../../common/configLayout";
import { bgBlur } from "../../theme/css";
import { useResponsive } from "../../hooks/useResponsive";

import AccountPopover from "./AccountPopover";

interface HeaderProps {
  onOpenNav: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenNav }) => {
  const { user } = useSelector((state: RootState) => state.auth);

  const theme = useTheme();
  const lgUp = useResponsive("up", "lg");
  const renderContent = (
    <>
      {user?.role === "admin" && !lgUp && (
        <IconButton onClick={onOpenNav} sx={{ mr: 1 }}>
          <MenuIcon />
        </IconButton>
      )}
      {user?.role === "admin" ? null : (
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
      )}

      <Box sx={{ flexGrow: 1 }} />
      <Stack direction="row" alignItems="center" spacing={1}>
        <AccountPopover />
      </Stack>
    </>
  );

  return (
    <AppBar
      sx={{
        boxShadow: "none",
        height: HEADER.H_MOBILE,
        zIndex: theme.zIndex.appBar + 1,
        background: theme.palette.grey[300],
        ...(lgUp && {
          width: `${
            user?.role === "admin" ? `calc(100% - ${NAV.WIDTH}px)` : "100%"
          } `,
          height: HEADER.H_DESKTOP,
        }),
      }}
    >
      <Toolbar
        sx={{
          height: 1,
          px: { lg: 5 },
        }}
      >
        {renderContent}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
