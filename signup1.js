// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { FaUser } from "react-icons/fa";
// import "./Signup.css";
// import { register, reset } from "../redux/slices/userSlice";

// const Signup = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     mobile: "",
//     gender: "",
//     password: "",
//     confirmPassword: "",
//     profileImg: null,
//   });

//   const { name, email, mobile, gender, password, confirmPassword, profileImg } =
//     formData;

//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { user, isLoading, isError, isSuccess, message } = useSelector(
//     (state) => state.user
//   );

//   useEffect(() => {
//     if (isError) {
//       toast.error(message);
//     }

//     if (isSuccess || user) {
//       navigate("/");
//     }

//     dispatch(reset());
//   }, [user, isError, isSuccess, message, navigate, dispatch]);
//   const onChange = (e) => {
//     if (e.target.files) {
//       console.log(e.target.files[0]);
//       setFormData((prevState) => ({
//         ...prevState,
//         [e.target.name]: e.target.files[0],
//       }));
//     } else {
//       setFormData((prevState) => ({
//         ...prevState,
//         [e.target.name]: e.target.value,
//       }));
//     }
//   };
//   useEffect(() => {
//     console.log(formData);
//   }, [formData]);

//   // const handleUpload = (e) => {

//   // }

//   const onSubmit = (e) => {
//     e.preventDefault();

//     if (formData.password !== formData.confirmPassword) {
//       toast.error("Password do not match");
//     } else {
//       const userData = {
//         name,
//         email,
//         mobile,
//         gender,
//         password,
//         confirmPassword,
//         profileImg,
//       };
//       console.log(userData);
//       dispatch(register(userData));
//     }

//     if (isLoading) {
//       return "Loading...";
//     }
//   };

//   return (
//     <>
//       <section className="heading">
//         <h1>
//           <FaUser /> Register
//         </h1>
//         <p>Please create an account</p>
//       </section>

//       <section className="form">
//         <form onSubmit={onSubmit} encType="multipart/form-data">
//           <div className="form-group">
//             <input
//               type="text"
//               className="form-controll"
//               id="name"
//               name="name"
//               value={name}
//               placeholder="Enter your name"
//               onChange={onChange}
//             />
//             <input
//               type="email"
//               className="form-controll"
//               id="email"
//               name="email"
//               value={email}
//               placeholder="Enter your email"
//               onChange={onChange}
//             />
//             <input
//               type="number"
//               className="form-controll"
//               id="mobile"
//               name="mobile"
//               value={mobile}
//               placeholder="Enter your mobile"
//               onChange={onChange}
//             />
//             <input
//               type="text"
//               className="form-controll"
//               id="gender"
//               name="gender"
//               value={gender}
//               placeholder="Enter your gender"
//               onChange={onChange}
//             />
//             <input
//               type="password"
//               className="form-controll"
//               id="password"
//               name="password"
//               value={password}
//               placeholder="Enter your password"
//               onChange={onChange}
//             />
//             <input
//               type="password"
//               className="form-controll"
//               id="confirmPassword"
//               name="confirmPassword"
//               value={confirmPassword}
//               placeholder="Enter your confirmPassword"
//               onChange={onChange}
//             />
//             <input
//               type="file"
//               className="form-controll"
//               id="Profile"
//               name="profileImg"
//               accept="image/*"
//               onChange={onChange}
//             />
//             {/* <button onClick={handleUpload}>Upload</button> */}
//           </div>
//           <div className="formgroup">
//             <button type="submit" className="btn btn-block">
//               {" "}
//               Submit{" "}
//             </button>
//           </div>
//         </form>
//       </section>
//     </>
//   );
// };

// export default Signup;

import { useFormik } from "formik";
import * as Yup from "yup";

const RegisterForm = () => {
  const initialValues = {
    name: "",
    email: "",
    mobile: "",
    gender: "",
    password: "",
    confirmPassword: "",
    profileImg: null,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    mobile: Yup.string().required("Mobile is required"),
    gender: Yup.string().required("Gender is required"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    profileImg: Yup.mixed().required("Profile Image is required"),
  });

  const onSubmit = (values) => {
    // Handle form submission
    console.log(values);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
     <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Change Password
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <div>
                    <label htmlFor="oldpassword">Old Password</label>
                    <input
                      name="oldpassword"
                      id="oldpassword"
                      type="password"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                    />
                    <label htmlFor="newpassword">New Password</label>
                    <input
                      name="newpassword"
                      id="newpassword"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>

                  <button
                    type="submit"
                    onClick={handleresetpasswordsubmit}
                    className="btn btn-primary"
                    data-bs-dismiss="modal"
                  >
                    Submit
                  </button>
                </div>
            </div>
          </div>
        </div>




    // <section className="form">
    //   <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
    //     <div className="form-group">
    //       <input
    //         type="text"
    //         className="form-control"
    //         id="name"
    //         name="name"
    //         value={formik.values.name}
    //         placeholder="Enter your name"
    //         onChange={formik.handleChange}
    //         onBlur={formik.handleBlur}
    //       />
    //       {formik.touched.name && formik.errors.name && (
    //         <div className="error">{formik.errors.name}</div>
    //       )}
    //       <input
    //         type="email"
    //         className="form-control"
    //         id="email"
    //         name="email"
    //         value={formik.values.email}
    //         placeholder="Enter your email"
    //         onChange={formik.handleChange}
    //         onBlur={formik.handleBlur}
    //       />
    //       {formik.touched.email && formik.errors.email && (
    //         <div className="error">{formik.errors.email}</div>
    //       )}
    //       <input
    //         type="text"
    //         className="form-control"
    //         id="mobile"
    //         name="mobile"
    //         value={formik.values.mobile}
    //         placeholder="Enter your mobile number"
    //         onChange={formik.handleChange}
    //         onBlur={formik.handleBlur}
    //       />
    //       {formik.touched.mobile && formik.errors.mobile && (
    //         <div className="error">{formik.errors.mobile}</div>
    //       )}
    //       <input
    //         type="text"
    //         className="form-control"
    //         id="gender"
    //         name="gender"
    //         value={formik.values.gender}
    //         placeholder="Enter your gender"
    //         onChange={formik.handleChange}
    //         onBlur={formik.handleBlur}
    //       />
    //       {formik.touched.gender && formik.errors.gender && (
    //         <div className="error">{formik.errors.gender}</div>
    //       )}
    //       <input
    //         type="password"
    //         className="form-control"
    //         id="password"
    //         name="password"
    //         value={formik.values.password}
    //         placeholder="Create Password"
    //         onChange={formik.handleChange}
    //         onBlur={formik.handleBlur}
    //       />
    //       {formik.touched.password && formik.errors.password && (
    //         <div className="error">{formik.errors.password}</div>
    //       )}
    //       <input
    //         type="password"
    //         className="form-control"
    //         id="confirmPassword"
    //         name="confirmPassword"
    //         value={formik.values.confirmPassword}
    //         placeholder="Confrim Password"
    //         onChange={formik.handleChange}
    //         onBlur={formik.handleBlur}
    //       />
    //       {formik.touched.confirmPassword && formik.errors.confirmPassword && (
    //         <div className="error">{formik.errors.confirmPassword}</div>
    //       )}
    //       <input
    //         type="file"
    //         accept="image/*"
    //         className="form-control"
    //         id="profileImg"
    //         name="profileImg"
    //         value={formik.values.profileImg}
    //         onChange={formik.handleChange}
    //         onBlur={formik.handleBlur}
    //       />
    //       {formik.touched.profileImg && formik.errors.profileImg && (
    //         <div className="error">{formik.errors.profileImg}</div>
    //       )}

    //       {/* Other form fields */}

    //       <button type="submit" className="btn btn-block">
    //         Submit
    //       </button>
    //     </div>
    //   </form>
    // </section>
  );
};

export default RegisterForm;


// search

// const sanitizedString = (string) => {
//   if (!string) {
//     return ""; // Return an empty string if the parameter is undefined or null
//   }
//   return string.replace(/[^a-zA-Z0-9]/g, " ");
// };

// const getSearchResult = async (req, res) => {
//   try {
//     const { title, category, salary, time } = req.query;
//     // const threshold = new Date();
//     // threshold.setHours(threshold.getHours() - time);
//     // console.log(sanitizedString(keyword));

//     const searchResult = await Job.find({
//       $or: [
//         { jobTitle: { $regex: sanitizedString(title), $options: "i" }, isDeleted: false },
//         { category: { $regex: sanitizedString(category), $options: "i" }, isDeleted: false },
//         { salary: { $regex: sanitizedString(salary), $options: "i" }, isDeleted: false },
//         // { createdAt: { $gte: threshold }, isDeleted: false },
//         // { category: { $regex: category, } },
//       ],
//     });

//     if(searchResult.length !==0){
//       return res.status(200).json({ search: searchResult });
//     }else {
//       return res.status(400).json({message: "there is no jobs found."})
//     }
//   } catch (error) {
//     console.log(error);
//     return res.status(400).json({error: error.message})
//   }
// };


//userSign up profile

<section className="vh-100" style={{ backgroundColor: "#f4f5f7" }}>
  <Container className="py-5 h-100">
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      className="h-100"
    >
      {/* <div>UserProfile</div> */}
      <Grid item lg={6} className="mb-4 mb-lg-0">
        <Card className="mb-3" sx={{ borderRadius: ".5rem" }}>
          <Grid container spacing={0}>
            <Grid
              item
              md={4}
              className="gradient-custom text-center text-white"
              sx={{
                borderTopLeftRadius: ".5rem",
                borderBottomLeftRadius: ".5rem",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CardMedia
                component="img"
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                alt="Avatar"
                className="my-5"
                sx={{ width: "80px" }}
              />
              <Typography variant="h5" style={{ color: "black" }}>
                Marie Horwitz
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "start",
                  color: "black",
                }}
              ></Box>
              <a href="#!">
                <Twitter
                  sx={{ marginRight: "3px", color: "black" }}
                  fontSize="large"
                />
              </a>
              <Box />

              <Typography variant="body1" style={{ color: "black" }}>
                Web Designer
              </Typography>
              <Box mt={5}>
                <Email fontSize="large" />
              </Box>
            </Grid>
            <Grid item md={8}>
              <CardContent className="p-4">
                <Typography variant="h6">Information</Typography>
                <hr className="mt-0 mb-4" />
                <Grid container spacing={1}>
                  <Grid className="mb-3">
                    <Typography variant="h6">Email: jjeesdfdsdfdsf</Typography>
                    <Typography variant="body2" className="text-muted">
                      info@example.com
                    </Typography>
                    <Typography variant="h6">Mobile: 9977554433</Typography>
                    <Typography variant="body2" className="text-muted">
                      info@example.com
                    </Typography>
                  </Grid>
                </Grid>
                {/* <Box sx={{ display: "flex", justifyContent: "start" }}>
                        <a href="#!">
                          <Facebook
                            sx={{ marginRight: "3px" }}
                            fontSize="large"
                          />
                        </a>
                        <a href="#!">
                          <Twitter
                            sx={{ marginRight: "3px" }}
                            fontSize="large"
                          />
                        </a>
                        <a href="#!">
                          <Instagram fontSize="large" />
                        </a>
                      </Box> */}
              </CardContent>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  </Container>
</section>;



// login page 9-06

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
