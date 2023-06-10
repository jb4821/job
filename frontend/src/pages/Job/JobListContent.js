import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { applyforJob, getAllJob } from "../../redux/slices/jobSlice";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Loading from "../../components/Loading";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Search from "../../components/Search";
import { filterData } from "../../redux/slices/searchSlice";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import SearchJob from "../../components/Search";

const JobListContent = () => {
  //   const { id } = useParams();
  // console.log("id", id);
  const dispatch = useDispatch();
  const {profile, role} = useSelector((state) => state.auth);
  // console.log("id", id);
  const { jobs, loading } = useSelector((state) => state.search);
  // console.log(jobs);

  const token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : null;

  const sortedJobs = [...jobs].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

  const [openModal, setOpenModal] = useState({});
  const [applyModal, setApplyModal] = useState({});
  const [selectedJob, setSelectedJob] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [selectedJobdetails, setSelectedJobDetails] = useState(null);

  // console.log(selectedJobdetails);
  // console.log("recruiter",selectedJobdetails.recruiterId._id);

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
    // console.log("Selected Job ID:", selectedJob);
    // console.log("Resume File:", resumeFile);
    // console.log("recruiter", selectedJobdetails.recruiterId._id);

    // Reset state variables
    // setSelectedJob("");
    // setResumeFile(null);

    handleApplyClose(selectedJob);
  };

  // useEffect(() => {
  //   dispatch(filterData());
  // }, []);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { month: "short", day: "numeric", year: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
  }

  return (
    <>
      
      <SearchJob />
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="tab-content">
            {/* {console.log("hell", jobs)} */}
            <div id="tab-1" className="tab-pane fade show p-0 active">
              <h1 className="h5 text-center mt-4">Job List</h1>

              {sortedJobs.map((job, index) => {
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
                        {console.log(job.recruiterId.profileImg)}
                        <div className="text-start ps-4">
                          <h5 className="mb-3">{job.jobTitle}</h5>
                          <span className="text-truncate me-3">
                            <i className="fa fa-map-marker-alt text-primary me-2"></i>
                            {job.recruiterId.location}
                          </span>
                          <span className="text-truncate me-3">
                            <i className="far fa-clock text-primary me-2"></i>
                            {job.category}
                          </span>
                          <span className="text-truncate me-3">
                            <i className="far fa-money-bill-alt text-primary me-2"></i>
                            {job.salary}
                          </span>
                          <span className="text-truncate me-3">
                            <i className="far fa-money-bill-alt text-primary me-2"></i>
                            {job.recruiterId.company}
                          </span>
                          <span className="text-truncate me-0">
                            <i className="far fa-money-bill-alt text-primary me-2"></i>
                            {job.experience}
                          </span>
                        </div>
                      </div>
                      <div className="col-sm-12 col-md-4 d-flex flex-column align-items-start align-items-md-end justify-content-center">
                        <div className="d-flex mb-3">
                          {/* <a className="btn btn-primary me-2" href="">
                            More Details...
                          </a> */}
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
                                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
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
                                  JobTitle: {job?.jobTitle}
                                  {/* {console.log("job", job)} */}
                                  <br />
                                  Category: {job.category}
                                  <br />
                                  Description: {job.description}
                                  <br />
                                  Salary: {job.salary}
                                  <br />
                                  Experience: {job.experience}
                                  <br />
                                  Company: {job.recruiterId.company}
                                  <br />
                                  Location: {job.recruiterId.location}
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
                                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
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
            </div>
          </div>
        </>
      )}
     
    </>
  );
};

export default JobListContent;
