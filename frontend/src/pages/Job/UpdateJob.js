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
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateJob, getJobbyid } from "../../redux/slices/jobSlice";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Loading from "../../components/Loading";

const defaultTheme = createTheme();

const UpdateJob = () => {
  const { id } = useParams();
 
  const [jobTitle, setJobtitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [salary, setSalary] = useState("");
  const [experience, setExperience] = useState("");

const job = useSelector((state) => state.jobs);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getJobbyid(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (job.job && job.job.length > 0) {
      const updatedJob = job.job[0];
      setJobtitle(updatedJob.jobTitle);
      setCategory(updatedJob.category);
      setDescription(updatedJob.description);
      setSalary(updatedJob.salary);
      setExperience(updatedJob.experience);
    }
  }, [job]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const jobData = {
      jobTitle,
      category,
      description,
      salary,
      experience,
    };
    const data = JSON.stringify(jobData);
    dispatch(updateJob({ id, Job: data }));
    navigate("/dashboard");
  };

  return (
    <>
      <Navbar />
      {!job.job || job.job.length === 0 ? (
        <Loading />
      ) : (
        <>
          {" "}
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
                  Update Job
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
                        value={jobTitle}
                        onChange={(e) => setJobtitle(e.target.value)}
                        autoComplete="given-name"
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
                        autoComplete="email"
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
                        autoComplete="mobile"
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
                        autoComplete="company"
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
                        autoComplete="location"
                      />
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Update Job
                  </Button>
                </form>
              </Box>
            </Container>
          </ThemeProvider>
        </>
      )}
    </>
  );
};

export default UpdateJob;
