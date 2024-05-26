import React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../utils/types";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";

import { userLoggedOut } from "../../store/features/auth/authSlice";

const AccountPopover = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const theme = useTheme();
  const dispatch = useDispatch();

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogOut = () => {
    dispatch(userLoggedOut());
  };

  return (
    <>
      <Box
        sx={{
          flexGrow: 0,
          display: "flex",
          alignItems: "center",
          color: "text.secondary",
        }}
      >
        <Box
          sx={{
            marginRight: 1,
          }}
        >
          <Typography variant="body2">
            {`${user?.name} `}
            <Typography
              variant="body2"
              component="span"
              color={`${
                user?.role === "admin"
                  ? theme.palette.error.main
                  : theme.palette.success.main
              }`}
            >
              ({user?.role})
            </Typography>
          </Typography>
        </Box>
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: "45px" }}
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <MenuItem>
            <Typography textAlign="center" onClick={handleLogOut}>
              Logout
            </Typography>
          </MenuItem>
        </Menu>
      </Box>
    </>
  );
};

export default AccountPopover;
