// import React, { useEffect, useState } from "react";
// import Box from "@mui/material/Box";
// import TextField from "@mui/material/TextField";
// import { Button, Typography } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import { filterData } from "../redux/slices/searchSlice";
// import { getAllJob } from "../redux/slices/jobSlice";

// const Search = () => {
//   const dispatch = useDispatch();

//   const [title, setTitle] = useState("");
//   const [category, setCategory] = useState("");
//   const [salary, setSalary] = useState("");

//   const handleTitleChange = (e) => {
//     setTitle(e.target.value);
//     // dispatch(filterData({ title, category, salary }));
//   };

//   const handleCategoryChange = (e) => {
//     setCategory(e.target.value);
//     console.log("HII");
//     // dispatch(filterData({ title, category, salary }));
//   };

//   const handleSalaryChange = (e) => {
//     setSalary(e.target.value);
//     // dispatch(filterData({ title, category, salary }));
//   };
//   // console.log("sds", title);
//   // console.log("sds", category);
//   // console.log("sds", salary);

//   useEffect(() => {
//     dispatch(filterData({ title, category, salary }));
//   }, [salary, category, title]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(title);
//     dispatch(
//       filterData({
//         title,
//         category,
//         salary,
//       })
//     );
//     setTitle("");
//   };

//   return (
//     <Box
//       component="form"
//       sx={{
//         "& .MuiTextField-root": { m: 1, width: "25ch" },
//         backgroundImage:
//           'url("https://img.freepik.com/premium-photo/blank-sign-empty-chair-hiring-new-job-vacancy-concept-d-rendering_601748-4880.jpg?w=1060")',
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         height: "300px",

//         /* Add any other background-related styles here */
//       }}
//       noValidate
//       autoComplete="off"
//       //   onSubmit={handleSubmit}
//     >
//       <div>
//         <Typography variant="h3" component="h2">
//           Filter jobs
//         </Typography>
//         <TextField
//           id="outlined-multiline-flexible"
//           label="Title"
//           maxRows={4}
//           value={title}
//           onChange={handleTitleChange}
//         />
//         <TextField
//           id="outlined-multiline-flexible"
//           label="Category"
//           maxRows={4}
//           value={category}
//           onChange={handleCategoryChange}
//         />
//         <TextField
//           id="outlined-multiline-flexible"
//           label="Salary"
//           maxRows={4}
//           value={salary}
//           onChange={handleSalaryChange}
//         />
//         {/* <Button type="submit" variant="contained" color="primary">
//           Search
//         </Button> */}
//       </div>
//     </Box>
//   );
// };

// export default Search;

import React, { useEffect, useState } from "react";
import { Grid, Box, TextField, Button, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { filterData } from "../redux/slices/searchSlice";

const Search = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [salary, setSalary] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSalaryChange = (e) => {
    setSalary(e.target.value);
  };

  useEffect(() => {
    dispatch(filterData({ title, category, salary }));
  }, [salary, category, title]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      filterData({
        title,
        category,
        salary,
      })
    );
    setTitle("");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
        background: "#f2f2f2",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Typography variant="h5">Filter Jobs</Typography>
        </Grid>
        <Grid item>
          <TextField
            id="title"
            label="Title"
            value={title}
            onChange={handleTitleChange}
            variant="outlined"
            sx={{ width: "200px" }}
          />
        </Grid>
        <Grid item>
          <TextField
            id="category"
            label="Category"
            value={category}
            onChange={handleCategoryChange}
            variant="outlined"
            sx={{ width: "200px" }}
          />
        </Grid>
        <Grid item>
          <TextField
            id="salary"
            label="Salary"
            value={salary}
            onChange={handleSalaryChange}
            variant="outlined"
            sx={{ width: "200px" }}
          />
        </Grid>
        <Grid item>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Search
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Search;
