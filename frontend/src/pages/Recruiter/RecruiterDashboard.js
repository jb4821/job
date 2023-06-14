import React, { useEffect, useState } from "react";
import "./RecruiterDashboard.css";
import Navbar from "../../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { deleteJob, getJobbyrecruiter } from "../../redux/slices/jobSlice";
import Loading from "../../components/Loading";
import { Link } from "react-router-dom";
import { Grid, Pagination } from "@mui/material";

const RecruiterDashboard = () => {
 
  const dispatch = useDispatch();
  const { jobs, loading, is_update, is_deleted, length } = useSelector(
    (state) => state.jobs
  );
 
  const [jobList, setjobList] = useState([]);
  const [page, setPage] = useState(1)

  useEffect(() => {
    dispatch(getJobbyrecruiter(page));
  }, [dispatch, is_deleted, page]);

  useEffect(() => {
    dispatch(getJobbyrecruiter(page));
  }, [dispatch, page]);

  useEffect(() => {
    dispatch(getJobbyrecruiter(page));
  }, [dispatch, is_update,page]);

  

  useEffect(() => {
    setjobList(jobs);
  }, [jobs]);

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
        <div className="tab-content">
          <div id="tab-1" className="tab-pane fade show p-0 active">
            <h1 className="h5 text-center">Your Jobs</h1>
            {jobs?.length === 0 ? (
              <h2>You no post any jobs yet.</h2>
            ) : (
              <>
                {jobList?.map((job, index) => {
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
                            <Link
                              className="btn btn-primary me-2"
                              href=""
                              onClick={() => {
                                dispatch(deleteJob({_id: job._id, dispatch } ));
                              }}
                            >
                              Delete
                            </Link>
                            <Link
                              className="btn btn-primary"
                              to={`/updatejob/${job._id}`}
                            >
                              Update
                            </Link>
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
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default RecruiterDashboard;
