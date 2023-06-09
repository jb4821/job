import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";
import { getUserAppliedJob } from "../../redux/slices/jobSlice";
import { Link } from "react-router-dom";

const UserApplication = () => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.auth.profile._id);
  console.log("userid", id);
  const { appliedjobs, loading } = useSelector((state) => state.jobs);
  // console.log("llll",appliedjobs)

  // const [list, setList] = useState([]);

  useEffect(() => {
    dispatch(getUserAppliedJob());
  }, [dispatch]);

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
                            {/* <p className="text-muted mb-0">@kiranacharyaa</p> */}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-baseline">
                          <h4 className="mr-1">{job.jobId.jobTitle}</h4>
                          {/* <small className="text-success">
                            <i className="fa fa-arrow-up"></i>5%
                          </small> */}
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
            </table>
          </>
        </div>
      )}
    </>
  );
};

export default UserApplication;
