import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./components/NotFound";

import ProtectedRoute from "./layouts/ProtectedRoute";
import PublicRoute from "./layouts/PublicRoute";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

const App = () => {
  const defaultTheme = createTheme();

  const routes = [
    {
      path: "/",
      component: (
        <PublicRoute>
          <Login />
        </PublicRoute>
      ),
    },
    {
      path: "/dashboard",
      component: (
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      ),
    },
  ];

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          {routes?.map(({ path, component }) => (
            <Route path={path} key={path} element={component} />
          ))}
          <Route path="notfound" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        {/* toastify */}
        <ToastContainer />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
