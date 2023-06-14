import {
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
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addJob } from "../../redux/slices/jobSlice";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

const defaultTheme = createTheme();

const AddJobs = () => {
  const [jobtitle, setJobtitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [salary, setSalary] = useState("");
  const [experience, setExperience] = useState("");

  const [errors, setErrors] = useState({
    jobtitleError: "",
    categoryError: "",
    descriptionError: "",
    salaryError: "",
    experienceError: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    let valid = true;
    const newError = {
      jobtitleError: "",
      categoryError: "",
      descriptionError: "",
      salaryError: "",
      experienceError: "",
    };

    if (jobtitle.trim() === "") {
      newError.jobtitleError = "Jobtitle is required";
      valid = false;
    }

    if (category.trim() === "") {
      newError.categoryError = "Category is required";
      valid = false;
    }

    if (description.trim() === "") {
      newError.descriptionError = "Description is required";
      valid = false;
    }

    if (salary.trim() === "") {
      newError.salaryError = "Salary is required";
      valid = false;
    }

    if (experience.trim() === "") {
      newError.experienceError = "Experience is required";
      valid = false;
    }

    setErrors(newError);

    if (valid) {
      const jobData = {
        jobTitle: jobtitle,
        category,
        description,
        salary,
        experience,
      };
      const data = JSON.stringify(jobData);
      dispatch(addJob(data), navigate("/dashboard"));

      setErrors({
        jobtitleError: "",
        categoryError: "",
        descriptionError: "",
        salaryError: "",
        experienceError: "",
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
            <Typography component="h1" variant="h5">
              Add Job
            </Typography>
            <form onSubmit={handleSubmit} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="jobtitle"
                    label="Job Title"
                    name="jobtitle"
                    value={jobtitle}
                    onChange={(e) => setJobtitle(e.target.value)}
                    autoComplete="given-name"
                    error={errors.jobtitleError !== ""}
                    helperText={errors.jobtitleError}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="category"
                    label="Category"
                    name="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    autoComplete="category"
                    error={errors.categoryError !== ""}
                    helperText={errors.categoryError}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="description"
                    label="Description"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    autoComplete="description"
                    error={errors.descriptionError !== ""}
                    helperText={errors.descriptionError}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="salary"
                    label="Salary"
                    name="salary"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    autoComplete="salary"
                    error={errors.salaryError !== ""}
                    helperText={errors.salaryError}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="experience"
                    label="Experience"
                    name="experience"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    autoComplete="experience"
                    error={errors.experienceError !== ""}
                    helperText={errors.experienceError}
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
                Add Job
              </Button>
            </form>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default AddJobs;
