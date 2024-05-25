import React, { useState } from "react";
import { Link as RoutLink, useNavigate } from "react-router-dom";
import { size } from "lodash";
import { toastAlert } from "../utils/AppHelpers";
import { useDispatch } from "react-redux";

import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";

import { useLoginMutation } from "../store/features/auth/authApi";
import { userLoggedIn } from "../store/features/auth/authSlice";

export default function Login() {
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Reset validation messages
    setEmailError("");
    setPasswordError("");

    let isValid = true;

    // Basic email validation
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

    if (size(mutationData)) {
      login(mutationData)
        .unwrap()
        .then((payload) => {
          const { accessToken, user } = payload || {};
          const result = {
            accessToken,
            user,
          };
          if (user?.role === "admin") {
            toastAlert("success", "Hi Admin!");
          }
          if (user?.role === "employee") {
            toastAlert("success", `Hi ${user?.name}!`);
          }
          if (size(result)) {
            localStorage.setItem("auth", JSON.stringify(result));
            dispatch(userLoggedIn(result));
          }
          navigate("/dashboard");
        })
        .catch((err) => {
          toastAlert("error", err?.data?.error || err?.error);
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
          <Grid container>
            <Grid item>
              <Link to="/registration" component={RoutLink} variant="body2">
                already have account? Sign In
              </Link>
            </Grid>
          </Grid>
        </Box>
        <Box component={Paper} sx={{ background: "#EBEBEB99", mb: 4 }}>
          <p>
            <strong>admin</strong>
          </p>
          <pre>
            <code>
              email:- admin@admin.com <br />
              password:- adminpassword
            </code>
          </pre>
          <p>
            <strong>employee</strong>
          </p>
          <pre>
            <code>
              email:- employee6@admin.com <br />
              password:- adminpassword
              <br />
              <br />
              email:-employee7@admin.com <br />
              password:- adminpassword
            </code>
          </pre>
        </Box>
      </Container>
    </>
  );
}
