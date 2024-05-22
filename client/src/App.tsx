import { ToastContainer } from "react-toastify";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./components/NotFound";
import ProtectedRoute from "./layouts/ProtectedRoute";
import Login from "./pages/Login";

function App() {
  const routes = [
    {
      path: "/",
      component: (
        <ProtectedRoute>
          <Login />
        </ProtectedRoute>
      ),
    },
  ];

  return (
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
  );
}

export default App;
