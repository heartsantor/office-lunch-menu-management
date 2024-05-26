import React, { useMemo, ReactNode } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
} from "@mui/material/styles";

import { overrides } from "./overrides";
import { palette } from "./palette";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ThemeProvider: React.FC<ProtectedRouteProps> = ({ children }) => {
  const memoizedValue = useMemo(
    () => ({
      palette: palette("light"),
      shape: { borderRadius: 8 },
    }),
    []
  );

  const theme = createTheme(memoizedValue);

  theme.components = overrides(theme);

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
};

export default ThemeProvider;
