import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";
import { getUserAppliedJob } from "../../redux/slices/jobSlice";
import { Link } from "react-router-dom";
import { Grid, Pagination } from "@mui/material";

const UserApplication = () => {
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();

  const id = useSelector((state) => state.auth.profile._id);
  const { appliedjobs, loading , length} = useSelector((state) => state.jobs);
  
  useEffect(() => {
    dispatch(getUserAppliedJob(page));
  }, [dispatch, page]);

  return (
    <>
      <Navbar />
      {loading ? (
        <Loading />
      ) : (
        <div>
          <>
            <h4 className="bold-center">Job Applications</h4>
            <table className="table">
              <thead>
                <tr>
                  <th>Job</th>
                  <th>Job Title</th>
                  <th>Company</th>
                  <th>Email</th>
                  <th>Resume</th>
                  <th>Status</th>
                </tr>
              </thead>
              {appliedjobs === null ? (
                <h2
                  style={{
                    // display: "flex",
                    textAlign: "center",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                  }}
                >
                  <b>You have not applied to any jobs.</b>
                </h2>
              ) : (
                <>
                  {appliedjobs?.map((job, index) => {
                    return (
                      <tbody key={index}>
                        <tr>
                          <td>
                            <div className="d-flex align-items-center">
                              <img
                                src={job.recruiterId.profileImg}
                                className="circle-img circle-img--small mr-2"
                                alt="User Img"
                              />
                              <div className="user-info__basic">
                                <h5 className="mb-0">{}</h5>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="d-flex align-items-baseline">
                              <h4 className="mr-1">{job.jobId.jobTitle}</h4>
                            </div>
                          </td>
                          <td>{job.recruiterId.company}</td>
                          <td>{job.recruiterId.email}</td>
                          <td>
                            <Link to={job.resume}>Download</Link>
                          </td>
                          <td>{job.status}</td>
                        </tr>
                      </tbody>
                    );
                  })}
                </>
              )}
            </table>
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
        </div>
      )}
    </>
  );
};

export default UserApplication;
