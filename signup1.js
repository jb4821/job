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