import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import LinearProgress from "@mui/material/LinearProgress";

const LoadingSpinner = ({ isLoading = false }) => {
  const loaderStyle = {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <>
      {isLoading ? (
        <Box sx={{ width: "100%", py: 16 }}>
          <LinearProgress />
        </Box>
      ) : (
        <div style={loaderStyle}>
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        </div>
      )}
    </>
  );
};

export default LoadingSpinner;
