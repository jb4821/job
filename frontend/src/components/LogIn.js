import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  ThemeProvider,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  createTheme,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signInUser, signInRecruiter } from "../redux/slices/authSlice";

const defaultTheme = createTheme();

const LogIn = () => {
  const [role, setRole] = useState("user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, loading, role: yrole } = useSelector((state) => state.auth);

  // useEffect(() => {
  //   if (yrole === "recruiter") {
  //     navigate("/dashboard");
  //   } else if (yrole === "user") {
  //     navigate("/");
  //   }
  // }, [token, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (role === "user") {
      dispatch(signInUser({ user: { email, password }, navigate }));
    } else if (role === "recruiter") {
      dispatch(signInRecruiter({ recruiter: { email, password }, navigate }));
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
              <LockOutlinedIcon />
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
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Log In
              </Button>
            </form>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default LogIn;
