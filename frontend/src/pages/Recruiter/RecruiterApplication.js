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

const RecruiterApplication = () => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.auth.profile._id);

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleAcceptClick = (application) => {
    dispatch(
      updateStatus({ id: application._id, status: { status: "accepted" } })
    );
     setIsButtonDisabled(true);
  };

  const handleRejectClick = (application) => {
    dispatch(
      updateStatus({ id: application._id, status: { status: "rejected" } })
    );
     setIsButtonDisabled(true);
  };

  useEffect(() => {
    dispatch(getRecruiterApplication());
    dispatch(updateStatus())
  }, [dispatch]);

  const { appliedjobs, loading } = useSelector((state) => state.jobs);
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
                          <h5 className="mb-0">{application.userId.name}</h5>
                          {/* <p className="text-muted mb-0">@kiranacharyaa</p> */}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-baseline">
                        <h4 className="mr-1">{application.userId.mobile}</h4>
                        {/* <small className="text-success">
                          <i className="fa fa-arrow-up"></i>5%
                        </small> */}
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
                        onClick={() => handleAcceptClick(application)}
                        disabled={isButtonDisabled}
                      >
                        Accept
                      </button>
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => handleRejectClick(application)}
                        disabled={isButtonDisabled}
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>
      )}
    </>
  );
};

export default RecruiterApplication;
