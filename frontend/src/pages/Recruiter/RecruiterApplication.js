import React, { useEffect, useState } from "react";
import "./RecruiterApplication.css";
import Navbar from "../../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";
import {
  getRecruiterApplication,
  updateStatus,
} from "../../redux/slices/jobSlice";
import { Link } from "react-router-dom";
import { Grid, Pagination } from "@mui/material";

const RecruiterApplication = () => {
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();
  const {profile} = useSelector((state) => state.auth);
  const { appliedjobs, loading, is_update, length } = useSelector((state) => state.jobs);

  const handleStatusClick = (application,status) => {
    dispatch(
      updateStatus({ id: application._id, status: { status: status } })
    );
  };


  useEffect(() => {
    dispatch(getRecruiterApplication(page));
  }, [dispatch, is_update, page]);

  return (
    <>
      <Navbar />
      {loading ? (
        <Loading />
      ) : (
        <div>
          <h4 className="bold-center">Job Applications</h4>
          <table className="table">
            <thead>
              <tr>
                <th>User</th>
                <th>Mobile No.</th>
                <th>Email</th>
                <th>JobTitle</th>
                <th>Resume</th>
                <th>Status</th>
                <th>Status</th>
              </tr>
            </thead>
            {appliedjobs === null ? (
              <h2
                style={{
        
                  textAlign: "center",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100vh",
                }}
              >
                <b>You have not found any request.</b>
              </h2>
            ) : (
              <>
                {appliedjobs?.map((application, index) => {
                  return (
                    <tbody key={index}>
                      <tr>
                        <td>
                          <div className="d-flex align-items-center">
                            <img
                              src={application.userId.profileImg}
                              className="circle-img circle-img--small mr-2"
                              alt="User Img"
                            />
                            <div className="user-info__basic">
                              <h5 className="mb-0">
                                {application.userId.name}
                              </h5>
                              
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-baseline">
                            <h4 className="mr-1">
                              {application.userId.mobile}
                            </h4>
                           
                          </div>
                        </td>
                        <td>{application.userId.email}</td>
                        <td>{application.jobId.jobTitle}</td>
                        <td>
                          <Link to={application.resume}>Download</Link>
                        </td>
                        <td>{application.status}</td>
                        <td>
                          <button
                            className="btn btn-success btn-sm mr-2"
                            onClick={() =>
                              handleStatusClick(application, "accepted")
                            }
                            disabled={application.status !== "pending"}
                          >
                            Accept
                          </button>
                          <button
                            className="btn btn-success btn-sm"
                            onClick={() =>
                              handleStatusClick(application, "rejected")
                            }
                            disabled={application.status !== "pending"}
                          >
                            Reject
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  );
                })}
              </>
            )}
          </table>
        </div>
      )}
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

export default RecruiterApplication;
