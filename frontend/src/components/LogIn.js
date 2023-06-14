import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  FormHelperText,
  Grid,
  TextField,
  ThemeProvider,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  createTheme,
} from "@mui/material";

import LoginIcon from "@mui/icons-material/Login";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signInUser, signInRecruiter } from "../redux/slices/authSlice";

const defaultTheme = createTheme();

const LogIn = () => {
  const [role, setRole] = useState("user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    emailError: "",
    passwordError: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    let isValid = true;
    const newErrors = {
      emailError: "",
      passwordError: "",
    };

    if (email.trim() === "") {
      newErrors.emailError = "Email is required";
      isValid = false;
    }

    if (password.trim() === "") {
      newErrors.passwordError = "Password is required";
      isValid = false;
    }
    setErrors(newErrors);

    if (isValid) {
      if (role === "user") {
        dispatch(signInUser({ user: { email, password }, navigate }));
      } else if (role === "recruiter") {
        dispatch(signInRecruiter({ recruiter: { email, password }, navigate }));
      }

      setErrors({
        emailError: "",
        passwordError: "",
      });
    }
  };

  return (
    <>
      <Navbar />
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LoginIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Log In
            </Typography>

            <form onSubmit={handleSubmit} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} justifyContent={"center"}>
                  <ToggleButtonGroup
                    color="primary"
                    value={role}
                    exclusive
                    onChange={(e) => {
                      setRole(e.target.value);
                    }}
                    aria-label="Role"
                  >
                    <ToggleButton value="user">User</ToggleButton>
                    <ToggleButton value="recruiter">Recruiter</ToggleButton>
                  </ToggleButtonGroup>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    error={errors.emailError !== ""}
                    helperText={errors.emailError}
                  />
                  
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                    error={errors.passwordError !== ""}
                    helperText={errors.passwordError}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: "#4CAF50",
                  "&:hover": {
                    backgroundColor: "#45a049",
                  },
                }}
              >
                Log In
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to={"/forgotpassword"} variant="body2">
                    Forgot Password?
                  </Link>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default LogIn;
