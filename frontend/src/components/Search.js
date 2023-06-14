import React, { useEffect, useState } from "react";
import { Grid, Box, TextField, Button, Typography, Pagination, Modal } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { filterData } from "../redux/slices/searchSlice";
import Loading from "./Loading";
import { toast } from "react-toastify";
import { applyforJob } from "../redux/slices/jobSlice";

const Search = () => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [salary, setSalary] = useState("");

 
  const { profile, role } = useSelector((state) => state.auth);

  const { jobs, loading, length } = useSelector((state) => state.search);

  const token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : null;

  const [openModal, setOpenModal] = useState({});
  const [applyModal, setApplyModal] = useState({});
  const [selectedJob, setSelectedJob] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [selectedJobdetails, setSelectedJobDetails] = useState(null);

  const handleOpen = (jobId) => {
    setOpenModal((prevState) => ({
      ...prevState,
      [jobId]: true,
    }));
  };

  const handleClose = (jobId) => {
    setOpenModal((prevState) => ({
      ...prevState,
      [jobId]: false,
    }));
  };

  const handleApplyOpen = (jobId) => {
    if (!token || role !== "user") {
      toast.error("You are not authorized");
      return;
    }
    setApplyModal((prevState) => ({
      ...prevState,
      [jobId]: true,
    }));
    setSelectedJob(jobId);
    setSelectedJobDetails(jobs.find((job) => job._id === jobId));
  };

  const handleApplyClose = (jobId) => {
    setApplyModal((prevState) => ({
      ...prevState,
      [jobId]: false,
    }));
    setSelectedJob("");
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    setResumeFile(file);
  };

  const handleApply = () => {
    const FileData = new FormData();
    FileData.append("userId", profile._id);
    FileData.append("jobId", selectedJob);
    FileData.append("recruiterId", selectedJobdetails.recruiterId._id);
    FileData.append("resume", resumeFile);
    dispatch(applyforJob({ data: FileData }));

    handleApplyClose(selectedJob);
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { month: "short", day: "numeric", year: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
  }

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
    dispatch(filterData({ title, category, salary, page }));
  }, [salary, category, title, page]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      filterData({
        title,
        category,
        salary,
      })
    );
  };

  return (
    <>
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
      <>
        {loading ? (
          <Loading />
        ) : (
          <>
            <div className="tab-content">
              <div id="tab-1" className="tab-pane fade show p-0 active">
                <h1 className="h3 text-center mt-4">Job List</h1>
                {jobs.length > 0 ? (
                  <>
                    {jobs?.map((job, index) => {
                      const isModalOpen = openModal[job._id] || false;
                      const isApplyModal = applyModal[job._id] || false;
                      return (
                        <div key={index} className="job-item p-4 mb-4">
                          <div className="row g-4">
                            <div className="col-sm-12 col-md-8 d-flex align-items-center">
                              <img
                                className="flex-shrink-0 img-fluid border rounded"
                                src={job.recruiterId.profileImg}
                                alt=""
                                style={{ width: "80px", height: "80px" }}
                              />

                              <div className="text-start ps-4">
                                <h5 className="mb-3">{job.jobTitle}</h5>
                                <span className="text-truncate me-3">
                                  <i className="fa fa-map-marker-alt text-primary me-2"></i>
                                  {job.recruiterId.location}
                                </span>
                                <span className="text-truncate me-3">
                                  <i className="fas fa-code text-primary me-2"></i>

                                  {job.category}
                                </span>
                                <span className="text-truncate me-3">
                                  <i className="far fa-money-bill-alt text-primary me-2"></i>
                                  {job.salary}
                                </span>
                                <span className="text-truncate me-3">
                                  <i
                                    className="fa fa-building text-primary me-2"
                                    aria-hidden="true"
                                  ></i>
                                  {job.recruiterId.company}
                                </span>
                                <span className="text-truncate me-0">
                                  <i className="fas fa-briefcase text-primary me-2"></i>
                                  {job.experience}
                                </span>
                              </div>
                            </div>
                            <div className="col-sm-12 col-md-4 d-flex flex-column align-items-start align-items-md-end justify-content-center">
                              <div className="d-flex mb-3">
                                <div>
                                  <Button
                                    variant="contained"
                                    onClick={() => handleOpen(job._id)}
                                    key={job._id}
                                    sx={{
                                      backgroundColor: "#3CCF56",
                                      color: "#FFFFFF",
                                      padding: "10px 20px",
                                      borderRadius: "5px",
                                      fontWeight: "bold",
                                      marginRight: "10px",
                                    }}
                                  >
                                    More details...
                                  </Button>
                                  <Modal
                                    open={isModalOpen}
                                    onClose={() => handleClose(job._id)}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                  >
                                    <Box
                                      sx={{
                                        position: "absolute",
                                        top: "50%",
                                        left: "50%",
                                        transform: "translate(-50%, -50%)",
                                        width: 400,
                                        bgcolor: "#FFFFFF",
                                        border: "2px solid #000",
                                        boxShadow:
                                          "0px 4px 10px rgba(0, 0, 0, 0.1)",
                                        p: 4,
                                        borderRadius: "8px",
                                      }}
                                    >
                                      <Typography
                                        id="modal-modal-title"
                                        variant="h6"
                                        component="h2"
                                      >
                                        Job Details
                                      </Typography>
                                      <Typography
                                        id="modal-modal-description"
                                        sx={{ mt: 2 }}
                                      >
                                        <b>JobTitle</b>: {job?.jobTitle}
                                        <br />
                                        <b>Category</b>: {job.category}
                                        <br />
                                        <b>Description</b>: {job.description}
                                        <br />
                                        <b>Salary</b>: {job.salary}
                                        <br />
                                        <b>Experience</b>: {job.experience}
                                        <br />
                                        <b>Company</b>:{" "}
                                        {job.recruiterId.company}
                                        <br />
                                        <b>Location</b>:{" "}
                                        {job.recruiterId.location}
                                      </Typography>
                                    </Box>
                                  </Modal>
                                </div>

                                <Button
                                  variant="contained"
                                  onClick={() => handleApplyOpen(job._id)}
                                  key={job._id}
                                  sx={{
                                    backgroundColor: "#3CCF56",
                                    color: "#FFFFFF",
                                    padding: "10px 20px",
                                    borderRadius: "5px",
                                    fontWeight: "bold",
                                    marginRight: "10px",
                                  }}
                                >
                                  Apply
                                </Button>

                                <Modal
                                  open={isApplyModal}
                                  onClose={() => handleApplyClose(job._id)}
                                  aria-labelledby="modal-modal-title"
                                  aria-describedby="modal-modal-description"
                                >
                                  <Box
                                    sx={{
                                      position: "absolute",
                                      top: "50%",
                                      left: "50%",
                                      transform: "translate(-50%, -50%)",
                                      width: 400,
                                      bgcolor: "#FFFFFF",
                                      border: "2px solid #000",
                                      boxShadow:
                                        "0px 4px 10px rgba(0, 0, 0, 0.1)",
                                      p: 4,
                                      borderRadius: "8px",
                                    }}
                                  >
                                    <Typography
                                      id="modal-modal-title"
                                      variant="h6"
                                      component="h2"
                                    >
                                      Upload Resume
                                    </Typography>
                                    <input
                                      type="file"
                                      id="file"
                                      accept=".pdf,.doc,.docx"
                                      onChange={handleUpload}
                                    />
                                    <Button
                                      variant="contained"
                                      onClick={handleApply}
                                      sx={{
                                        backgroundColor: "#3CCF56",
                                        color: "#FFFFFF",
                                        padding: "10px 20px",
                                        borderRadius: "5px",
                                        fontWeight: "bold",
                                        marginTop: "10px",
                                      }}
                                    >
                                      Submit
                                    </Button>
                                  </Box>
                                </Modal>
                              </div>
                              <small className="text-truncate">
                                <i className="far fa-calendar-alt text-primary me-2"></i>
                                {formatDate(job.updatedAt)}
                              </small>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: "20px"
                    }}
                  >
                    <h3 style={{ fontWeight: "bold" }}>No jobs found</h3>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </>

      <div>
        <Grid container justifyContent="center">
          <Pagination
            count={Math.ceil(length / 3)}
            page={page}
            onChange={(event, page) => setPage(page)}
            size="large"
            color="primary"
          />
        </Grid>
      </div>
    </>
  );
};

export default Search;
