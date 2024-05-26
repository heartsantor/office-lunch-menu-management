import { Suspense } from "react";
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
import EmployeeList from "./pages/EmployeeList";

import ThemeProvider from "./theme";

const App = () => {
  const isAuthChecked = useAuthCheck();

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
    {
      path: "/employee-list",
      component: (
        <ProtectedRoute>
          <EmployeeList />
        </ProtectedRoute>
      ),
    },
  ];

  if (!isAuthChecked) {
    return <LoadingSpinner />;
  }

  return (
    <ThemeProvider>
      <BrowserRouter>
        <Suspense>
          <Routes>
            {routes?.map(({ path, component }) => (
              <Route path={path} key={path} element={component} />
            ))}
            <Route path="notfound" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ToastContainer />
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
