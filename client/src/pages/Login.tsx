import React from "react";
import { useNavigate } from "react-router-dom";
import { size } from "lodash";
import { toastAlert } from "../utils/AppHelpers";
import { useDispatch } from "react-redux";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { useLoginMutation } from "../store/features/auth/authApi";
import { userLoggedIn } from "../store/features/auth/authSlice";

export default function Login() {
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const mutationData = {
      email: data.get("email"),
      password: data.get("password"),
    };

    if (size(mutationData)) {
      login(mutationData)
        .unwrap()
        .then((payload) => {
          const { accessToken, user } = payload || {};
          const result = {
            accessToken,
            user,
          };
          if (user?.role !== "admin") {
            toastAlert("success", "Hi Admin!");
          }
          if (user?.role !== "employee") {
            toastAlert("success", "Hi Employee!");
          }
          if (size(result)) {
            localStorage.setItem("auth", JSON.stringify(result));
            dispatch(userLoggedIn(result));
          }
          navigate("/dashboard");
        })
        .catch((err) => {
          toastAlert("error", err?.data || err?.error);
        });
    }
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5" textAlign="center">
            Office Lunch Menu Management System
          </Typography>
          <Typography component="h1" variant="h3" sx={{ mt: 5 }}>
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              disabled={isLoading}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {isLoading ? "Authenticating..." : "Sign in"}
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}
