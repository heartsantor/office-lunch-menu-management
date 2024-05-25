import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toastAlert } from "../utils/AppHelpers";
import { useDispatch } from "react-redux";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { useLoginMutation } from "../store/features/auth/authApi";
import { userLoggedIn } from "../store/features/auth/authSlice";
const Registration = () => {
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = (event: any) => {
    event.preventDefault();

    // Reset validation messages
    setEmailError("");
    setPasswordError("");

    let isValid = true;

    // Email validation
    if (!email) {
      setEmailError("Email is required.");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Email is invalid.");
      isValid = false;
    }

    // Password validation
    if (!password) {
      setPasswordError("Password is required.");
      isValid = false;
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    const mutationData = {
      email,
      password,
    };

    login(mutationData)
      .unwrap()
      .then((payload) => {
        console.log("🚀 ~ .then ~ payload:", payload);
        const { accessToken, user } = payload || {};
        const result = {
          accessToken,
          user,
        };
        if (user?.role !== "admin") {
          toastAlert("success", "Hi Admin!");
        }
        if (user?.role !== "employee") {
          toastAlert("success", `Hi ${user?.name}!`);
        }
        localStorage.setItem("auth", JSON.stringify(result));
        dispatch(userLoggedIn(result));
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log("🚀 ~ handleSubmit ~ err:", err);
        toastAlert("error", err?.data?.error || err?.error);
      });
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!emailError}
              helperText={emailError}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!passwordError}
              helperText={passwordError}
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
};

export default Registration;