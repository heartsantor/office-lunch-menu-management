import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const LoadingSpinner = () => {
  const loaderStyle = {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div style={loaderStyle}>
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    </div>
  );
};

export default LoadingSpinner;
