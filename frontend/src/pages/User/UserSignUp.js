// import  React, {useState, useEffect} from "react";
// import { useDispatch, useSelector } from 'react-redux';
// import { signUpUser } from "../../redux/slices/authSlice";
// import { useNavigate } from "react-router-dom";
// import * as Yup from "yup";
// import { Formik } from "formik";
// import { ToastContainer, toast } from "react-toastify";
// import IconButton from "@material-ui/core/IconButton";
// import PhotoCamera from "@material-ui/icons/PhotoCamera";
// import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
// import CssBaseline from "@mui/material/CssBaseline";
// import TextField from "@mui/material/TextField";
// import Radio from "@mui/material/Radio";
// import RadioGroup from "@mui/material/RadioGroup";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import FormControl from "@mui/material/FormControl";
// import FormLabel from "@mui/material/FormLabel";
// import { MuiFileInput } from "mui-file-input";
// import Link from "@mui/material/Link";
// import Grid from "@mui/material/Grid";
// import Box from "@mui/material/Box";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import Typography from "@mui/material/Typography";
// import Container from "@mui/material/Container";
// import { createTheme, ThemeProvider } from "@mui/material/styles";

// const defaultTheme = createTheme();

// const UserSignUp = () => {
//     const [profilepic, setProfilepic] = useState(null);

//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const { token, loading  } = useSelector((state) => state.auth);

//     useEffect(() => {
//         if(token) {
//             navigate("/")
//         }
//     },[]);

//     const initialValues = {
//       name: "",
//       email: "",
//       mobile: "",
//       gender: "",
//       password: "",

//     };

//     const userSignUpSchema = Yup.object().shape({
//       name: Yup.string().required("Name is required"),
//       email: Yup.string().email("Invalid email").required("Email is required"),
//       mobile: Yup.string().required("Mobile is required"),
//       gender: Yup.string().required("Gender is required"),
//       password: Yup.string().required("Password is required"),
//       profileImg: Yup.mixed().required("Profile Image is required"),
//     });

//    const handleCapture = ({ target }) => {
//       const fileReader = new FileReader();
//       const name = "images";

//       fileReader.readAsDataURL(target.files[0]);
//       fileReader.onload = (e) => {
//         setProfilepic(e.target.result);
//       };
//     };

//     // const onfilechange = (e) => {
//     //   e.preventDefault();
//     //   const reader = new FileReader();

//     //   reader.readAsDataURL(e.target.files[0]);
//     //   setProfilepic(e.target.files[0])
//     // };
//   const handleSubmit = (values) => {
//     // e.preventDefault();
//     console.log(values);
//      const userData = new FormData();

//     userData.append("name", values.name);
//     userData.append("email", values.email);
//     userData.append("mobile", values.mobile);
//     userData.append("gender", values.gender);
//     userData.append("password", values.password);
//     // userData.append("confirmPassword", values.confirmPassword);
//     userData.append("profileImg", profilepic);
//     console.log(userData);

//     dispatch(signUpUser({ user: userData, navigate }));
//   };

//  {loading && <p>Loaging</p> }
//   return (
//     <>
//       <Formik
//         initialValues={initialValues}
//         onSubmit={handleSubmit}
//         validationSchema={userSignUpSchema}
//       >
//         {(formik) => {
//           const {
//             values,
//             handleChange,
//             handleSubmit,
//             errors,
//             touched,
//             handleBlur,
//             isValid,
//             dirty,
//           } = formik;
//           return (
//             <ThemeProvider theme={defaultTheme}>
//               <Container component="main" maxWidth="xs">
//                 <CssBaseline />
//                 <Box
//                   sx={{
//                     marginTop: 8,
//                     display: "flex",
//                     flexDirection: "column",
//                     alignItems: "center",
//                   }}
//                 >
//                   <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
//                     <LockOutlinedIcon />
//                   </Avatar>
//                   <Typography component="h1" variant="h5">
//                     Sign up
//                   </Typography>
//                   <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
//                     <Grid container spacing={2}>
//                       <Grid item xs={12}>
//                         <TextField
//                           required
//                           fullWidth
//                           id="name"
//                           label="Name"
//                           name="name"
//                           value={values.name}
//                           onChange={handleChange}
//                           autoComplete="given-name"
//                         />
//                       </Grid>
//                       {errors.name && touched.name && (
//                         <span style={{ color: "red", textAlign: "end" }}>
//                           {errors.name}
//                         </span>
//                       )}
//                       <Grid item xs={12}>
//                         <TextField
//                           required
//                           fullWidth
//                           id="email"
//                           label="Email Address"
//                           name="email"
//                           value={values.email}
//                           onChange={handleChange}
//                           autoComplete="email"
//                         />
//                       </Grid>
//                       <Grid item xs={12}>
//                         <TextField
//                           required
//                           fullWidth
//                           id="mobile"
//                           label="Mobile Number"
//                           name="mobile"
//                           value={values.mobile}
//                           onChange={handleChange}
//                           autoComplete="mobile"
//                         />
//                       </Grid>
//                       <Grid item xs={12}>
//                         <FormControl>
//                           <FormLabel id="demo-row-radio-buttons-group-label">
//                             Gender
//                           </FormLabel>
//                           <RadioGroup
//                             row
//                             aria-labelledby="demo-row-radio-buttons-group-label"
//                             name="row-radio-buttons-group"
//                           >
//                             <FormControlLabel
//                               value="female"
//                               control={<Radio />}
//                               label="Female"
//                               onChange={handleChange}
//                             />
//                             <FormControlLabel
//                               value="male"
//                               control={<Radio />}
//                               label="Male"
//                             />
//                             <FormControlLabel
//                               value="other"
//                               control={<Radio />}
//                               label="Other"
//                             />
//                           </RadioGroup>
//                         </FormControl>
//                       </Grid>
//                       <Grid item xs={12}>
//                         <TextField
//                           required
//                           fullWidth
//                           name="password"
//                           label="Password"
//                           type="password"
//                           id="password"
//                           value={values.password}
//                           onChange={handleChange}
//                           autoComplete="new-password"
//                         />
//                       </Grid>
//                       {/* <Grid item xs={12}>
//                         <TextField
//                           required
//                           fullWidth
//                           name="Confirmpassword"
//                           label="ConfirmPassword"
//                           type="password"
//                           id="cpassword"
//                           variant="outlined"
//                           value={values.confirmPassword}
//                         //   onChange={handleChange}
//                         />
//                       </Grid> */}
//                       <Grid item xs={12}>
//                         <Grid item xs={12}>
//                           <input
//                             accept="image/*"
//                             id="icon-button-photo"
//                             onChange={handleCapture}
//                             type="file"
//                           />
//                           <label htmlFor="icon-button-photo">
//                             <IconButton color="primary" component="span">
//                               <PhotoCamera />
//                             </IconButton>
//                           </label>
//                         </Grid>
//                       </Grid>
//                     </Grid>
//                     <Button
//                       type="submit"
//                       fullWidth
//                       variant="contained"
//                       sx={{ mt: 3, mb: 2 }}
//                     >
//                       Sign Up
//                     </Button>
//                     <Grid container justifyContent="flex-end">
//                       <Grid item>
//                         <Link href="/sigin" variant="body2">
//                           Already have an account? Sign in
//                         </Link>
//                       </Grid>
//                     </Grid>
//                   </Box>
//                 </Box>
//               </Container>
//             </ThemeProvider>
//           );
//         }}
//       </Formik>
//       <ToastContainer
//         position="top-right"
//         autoClose={5000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         draggable
//         pauseOnHover
//         theme="light"
//       />
//     </>
//   );
// };

// export default UserSignUp;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUpUser } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ToastContainer, toast } from "react-toastify";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { MuiFileInput } from "mui-file-input";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const defaultTheme = createTheme();

const UserSignUp = () => {
  const [profilepic, setProfilepic] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
console.log(name,email,mobile,gender,password , profilepic);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  const initialValues = {
    name: "",
    email: "",
    mobile: "",
    gender: "",
    password: "",
  };

  //   const userSignUpSchema = Yup.object().shape({
  //     name: Yup.string().required("Name is required"),
  //     email: Yup.string().email("Invalid email").required("Email is required"),
  //     mobile: Yup.string().required("Mobile is required"),
  //     gender: Yup.string().required("Gender is required"),
  //     password: Yup.string().required("Password is required"),
  //     profileImg: Yup.mixed().required("Profile Image is required"),
  //   });

  const handleCapture = ({ target }) => {
    const fileReader = new FileReader();
    const name = "images";

    fileReader.readAsDataURL(target.files[0]);
    fileReader.onload = (e) => {
      setProfilepic(e.target.result);
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = new FormData();
    userData.append("name", name);
    userData.append("email", email);
    userData.append("mobile", mobile);
    userData.append("gender", gender);
    userData.append("password", password);
    userData.append("profilepic", profilepic);

    
    // userData.append("email", values.email);
    // userData.append("mobile", values.mobile);
    // userData.append("gender", values.gender);
    // userData.append("password", values.password);
    // userData.append("profileImg", profilepic);

    dispatch(signUpUser({ user: userData, navigate }));
  };

  return (
    <>
      {/* <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={userSignUpSchema}
      >
        {(formik) => {
          const {
            values,
            handleChange,
            handleSubmit,
            errors,
            touched,
            isValid,
            dirty,
          } = formik; */}
      {/* return ( */}
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
                  />
                </Grid>
                <Grid item xs={12}>
                  <Grid item xs={12}>
                    <input
                      accept="image/*"
                      id="icon-button-photo"
                      onChange={handleCapture}
                      type="file"
                    />
                    <label htmlFor="icon-button-photo">
                      <IconButton color="primary" component="span">
                        <PhotoCamera />
                      </IconButton>
                    </label>
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
                  <Link href="/signin" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Container>
      </ThemeProvider>
      );
      {/* }}
      </Formik> */}
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

export default UserSignUp;
