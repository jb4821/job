import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllJob } from '../../redux/slices/jobSlice';
import Navbar from '../../components/Navbar';
import Loading from '../../components/Loading';

const JobList = () => {

    const dispatch = useDispatch();

    const { jobs, loading } = useSelector((state) => state.jobs);
    console.log(jobs);

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
        <div className="tab-content">
          {console.log(jobs)}
          <div id="tab-1" className="tab-pane fade show p-0 active">
            <h1 className="h5 text-center">Job List</h1>
            {jobs?.map((job, index) => {
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
                        <a className="btn btn-primary me-2" href="">
                          More Details...
                        </a>
                        <a className="btn btn-primary" href="">
                          Apply
                        </a>
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
      )}
    </>
  );
}

export default JobList