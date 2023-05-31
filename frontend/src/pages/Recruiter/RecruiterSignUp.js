import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { signUpRecruiter } from "../../redux/slices/authSlice";

const defaultTheme = createTheme();

const RecruiterSignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [password, setPassword] = useState("");
  const [profilepic, setProfilepic] = useState(null);
  // console.log(profilepic);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const recruiterData = new FormData();
    recruiterData.append("name", name);
    recruiterData.append("email", email);
    recruiterData.append("mobile", mobile);
    recruiterData.append("company", company);
    recruiterData.append("location", location);
    recruiterData.append("password", password);
    recruiterData.append("profilepic", profilepic);
    console.log(profilepic);

    dispatch(signUpRecruiter({ recruiter: recruiterData, navigate }));
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
              Sign up
            </Typography>
            <form onSubmit={handleSubmit} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="given-name"
                  />
                  {/* <ErrorMessage
                          name="name"
                          component="span"
                          style={{ color: "red", textAlign: "end" }}
                        /> */}
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
                    id="mobile"
                    label="Mobile Number"
                    name="mobile"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    autoComplete="mobile"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="company"
                    label="Company Name"
                    name="company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    autoComplete="company"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="location"
                    label="Location"
                    name="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    autoComplete="location"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="password"
                    label="Password"
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>
                {/* <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="gender"
                    label="gender"
                    type="text"
                    id="gender"
                    value={gender}
                    onChange={(e) => setPassword(e.target.value)}
                  /> */}
                {/* </Grid> */}
                <Grid item xs={12}>
                  <Grid item xs={12}>
                    <input
                      type="file"
                      id="img"
                      name="img"
                      accept="image/*"
                      required
                      onChange={(e) => setProfilepic(e.target.files[0])}
                      />
                      
                  </Grid>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to={"/login"} variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Container>
      </ThemeProvider>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default RecruiterSignUp;
