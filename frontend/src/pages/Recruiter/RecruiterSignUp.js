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

  const [errors ,setErrors] = useState({
    nameError: "",
    emailError: "",
    mobileError: "",
    companyError: "",
    locationError: "",
    passwordError: "",
    profilepicError: null,
  })
 

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, loading } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();

    let valid = true;
    const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const newError = {
      nameError: "",
      emailError: "",
      mobileError: "",
      companyError: "",
      locationError: "",
      passwordError: "",
      profilepicError: null,
    };

    if (name.trim() === "") {
      newError.nameError = "Name is required";
      valid = false;
    }

    if (!email.match(isValidEmail)) {
      newError.emailError = "Please enter valid email.";
      valid = false;
    }

    if (mobile.length !== 10) {
      newError.mobileError = "Please enter valid mobile number.";
      valid = false;
    }

    if (company.trim() === "") {
      newError.companyError = "Company name is required";
      valid = false
    }

    if (location.trim() === "") {
      newError.locationError = "Location is required";
      valid = false
    }

    if (password.length < 8) {
      newError.passwordError = "Password length must be greaterthen 8.";
      valid = false;
    }


    setErrors(newError);

    if (valid) {

      const recruiterData = new FormData();
      recruiterData.append("name", name);
      recruiterData.append("email", email);
      recruiterData.append("mobile", mobile);
      recruiterData.append("company", company);
      recruiterData.append("location", location);
      recruiterData.append("password", password);
      recruiterData.append("profileImg", profilepic);
  
      dispatch(signUpRecruiter({ recruiter: recruiterData, navigate }));

      setErrors({
        nameError: "",
        emailError: "",
        mobileError: "",
        companyError: "",
        locationError: "",
        passwordError: "",
        profilepicError: null,
      });
    };
    }

  return (
    <>
      <Navbar />
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Recruiter Sign up
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
                    error={errors.nameError !== ""}
                    helperText={errors.nameError}
                  />
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
                    id="mobile"
                    label="Mobile Number"
                    name="mobile"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    autoComplete="mobile"
                    error={errors.mobileError !== ""}
                    helperText={errors.mobileError}
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
                    error={errors.companyError !== ""}
                    helperText={errors.companyError}
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
                    error={errors.locationError !== ""}
                    helperText={errors.locationError}
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
                    error={errors.passwordError !== ""}
                    helperText={errors.passwordError}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Grid item xs={12}>
                    <label htmlFor="img">Profile Image:</label>
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
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: "#4CAF50", 
                  "&:hover": {
                    backgroundColor: "#45a049", 
                  },
                }}
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
    </>
  );
};

export default RecruiterSignUp;
