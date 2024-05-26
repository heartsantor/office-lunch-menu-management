import React, { ReactNode } from "react";
import Box from "@mui/material/Box";
import { SxProps, Theme } from "@mui/material/styles";
import { useResponsive } from "../../hooks/useResponsive";
import { HEADER, NAV } from "../../common/configLayout";

const SPACING = 8;

interface MainProps {
  children: ReactNode;
  sx?: SxProps<Theme>;
  [key: string]: any;
}

const Main: React.FC<MainProps> = ({ children, sx, ...other }) => {
  const lgUp = useResponsive("up", "lg");

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        minHeight: 1,
        display: "flex",
        flexDirection: "column",
        py: `${HEADER.H_MOBILE + SPACING}px`,
        ...(lgUp && {
          px: 2,
          py: `${HEADER.H_DESKTOP + SPACING}px`,
          width: `calc(100% - ${NAV.WIDTH}px)`,
        }),
        ...sx,
      }}
      {...other}
    >
      {children}
    </Box>
  );
};

export default Main;
