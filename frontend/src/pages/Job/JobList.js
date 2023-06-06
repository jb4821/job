import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllJob } from "../../redux/slices/jobSlice";
import Navbar from "../../components/Navbar";
import Loading from "../../components/Loading";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const JobList = () => {
  const dispatch = useDispatch();

  const { jobs, loading } = useSelector((state) => state.jobs);
  console.log(jobs);

  const [openModal, setOpenModal] = useState({});
  const [resumeFile, setResumeFile] = useState(null);

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

  const handleUpload = (event) => {
    const file = event.target.files[0];
    setResumeFile(file);
  };

  const handleApply = () => {
    // Perform apply logic with resumeFile
    console.log("Resume file:", resumeFile);
    // Reset resumeFile state
    setResumeFile(null);
    // Close the modal
    handleClose();
  };

  useEffect(() => {
    dispatch(getAllJob());
  }, []);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { month: "short", day: "numeric", year: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
  }

  return (
    <>
      <Navbar />
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="tab-content">
            {console.log(jobs)}
            <div id="tab-1" className="tab-pane fade show p-0 active">
              <h1 className="h5 text-center">Job List</h1>
              {jobs?.map((job, index) => {
                const isModalOpen = openModal[job._id] || false;
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
                                  {console.log("job", job)}
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
                            onClick={handleOpen}
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
                            // open={open}
                            onClose={handleClose}
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
                                boxShadow: 24,
                                p: 4,
                                borderRadius: "8px",
                              }}
                            >
                              <Typography variant="h6" component="h2">
                                Apply for the job
                              </Typography>
                              <input type="file" onChange={handleUpload} />
                              <Button
                                variant="contained"
                                onClick={handleApply}
                                sx={{ marginTop: "10px" }}
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

export default JobList;
