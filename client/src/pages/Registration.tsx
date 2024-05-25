import React, { useState, ChangeEvent, FormEvent } from "react";
import { Link as RoutLink, useNavigate } from "react-router-dom";
import { toastAlert } from "../utils/AppHelpers";
import { useDispatch } from "react-redux";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { useRegistrationMutation } from "../store/features/auth/authApi";
import { userLoggedIn } from "../store/features/auth/authSlice";

const Registration: React.FC = () => {
  const [register, { isLoading }] = useRegistrationMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");

  const [emailError, setEmailError] = useState<string>("");
  const [nameError, setNameError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [repeatPasswordError, setRepeatPasswordError] = useState<string>("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Reset validation messages
    setEmailError("");
    setNameError("");
    setPasswordError("");
    setRepeatPasswordError("");

    let isValid = true;

    // Email validation
    if (!email) {
      setEmailError("Email is required.");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Email is invalid.");
      isValid = false;
    }

    // Name validation
    if (!name) {
      setNameError("Name is required.");
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

    // Repeat Password validation
    if (!repeatPassword) {
      setRepeatPasswordError("Repeat password is required.");
      isValid = false;
    } else if (password !== repeatPassword) {
      setRepeatPasswordError("Passwords do not match.");
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    const mutationData = {
      email,
      name,
      password,
      role: "employee",
    };

    register(mutationData)
      .unwrap()
      .then((payload: any) => {
        const { accessToken, user } = payload || {};
        const result = {
          accessToken,
          user,
        };
        toastAlert("success", `Hi ${user?.name}!`);
        localStorage.setItem("auth", JSON.stringify(result));
        dispatch(userLoggedIn(result));
        navigate("/dashboard");
      })
      .catch((err: any) => {
        toastAlert("error", err?.data?.error || err?.error);
      });
  };

  return (
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
          Registration
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            error={!!emailError}
            helperText={emailError}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
            error={!!nameError}
            helperText={nameError}
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
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            error={!!passwordError}
            helperText={passwordError}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="repeatPassword"
            label="Repeat Password"
            type="password"
            id="repeatPassword"
            autoComplete="repeat-password"
            value={repeatPassword}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setRepeatPassword(e.target.value)
            }
            error={!!repeatPasswordError}
            helperText={repeatPasswordError}
          />
          <Button
            disabled={isLoading}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {isLoading ? "Registering..." : "Register"}
          </Button>
        </Box>
        <Grid container>
          <Grid item>
            <Link to="/" component={RoutLink} variant="body2">
              already have account? Sign In
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Registration;
