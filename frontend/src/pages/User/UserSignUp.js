import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUpUser } from "../../redux/slices/authSlice";
import { useNavigate, Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Navbar from "../../components/Navbar";

const defaultTheme = createTheme();

const UserSignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, loading } = useSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [profileimg, setProfileimg] = useState(null);

  const [errors, setErrors] = useState({
    nameError: "",
    emailError: "",
    mobileError: "",
    genderError: "",
    passwordError: "",
    profileimgError: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    let valid = true;
    const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const newError = {
      nameError: "",
      emailError: "",
      mobileError: "",
      genderError: "",
      passwordError: "",
      profileimgError: null,
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
      newError.mobileError = "Please enter valid mobile number."
      valid = false;
    }

    if (password.length < 8) {
      newError.passwordError = "Password length must be greaterthen 8."
      valid = false
    }

    if (profileimg === null) {
      newError.profileimgError = "Please select profile pic."
      valid = false
    }

    setErrors(newError);

    if(valid){

      const userData = new FormData();
      userData.append("name", name);
      userData.append("email", email);
      userData.append("mobile", mobile);
      userData.append("gender", gender);
      userData.append("password", password);
      userData.append("profileImg", profileimg);
  
      dispatch(signUpUser({ user: userData, navigate }));
  
      setErrors({
        nameError: "",
        emailError: "",
        mobileError: "",
        genderError: "",
        passwordError: "",
        profileimgError: null,
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
              marginTop: 6,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              User Sign up
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
                  <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">
                      Gender
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="gender"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <FormControlLabel
                        value="female"
                        control={<Radio />}
                        label="Female"
                      />
                      <FormControlLabel
                        value="male"
                        control={<Radio />}
                        label="Male"
                      />
                      <FormControlLabel
                        value="other"
                        control={<Radio />}
                        label="Other"
                      />
                    </RadioGroup>
                  </FormControl>
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
                <Grid item xs={12}>
                  <label htmlFor="img">Profile Image:</label>
                  <Grid item xs={12}>
                    <input
                      type="file"
                      id="img"
                      name="img"
                      accept="image/*"
                      required
                      onChange={(e) => setProfileimg(e.target.files[0])}
                      error={errors.profileimgError !== ""}
                      helperText={errors.profileimgError}
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

export default UserSignUp;
