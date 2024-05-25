import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import useAuthCheck from "./hooks/useAuthCheck";

import NotFound from "./components/NotFound";
import LoadingSpinner from "./components/LoadingSpinner";

import ProtectedRoute from "./layouts/ProtectedRoute";
import PublicRoute from "./layouts/PublicRoute";

import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Dashboard from "./pages/Dashboard";
import CreateItem from "./pages/CreateItem";
import ChoiceList from "./pages/ChoiceList";

const App = () => {
  const isAuthChecked = useAuthCheck();
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
      path: "/registration",
      component: (
        <PublicRoute>
          <Registration />
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
    {
      path: "/create-item",
      component: (
        <ProtectedRoute>
          <CreateItem />
        </ProtectedRoute>
      ),
    },
    {
      path: "/choice-list",
      component: (
        <ProtectedRoute>
          <ChoiceList />
        </ProtectedRoute>
      ),
    },
  ];

  if (!isAuthChecked) {
    return <LoadingSpinner />;
  }

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
