import React from 'react'
import Navbar from '../../components/Navbar';
import { useSelector } from 'react-redux';

const RecruiterProfile = () => {
    const { profile } = useSelector((state) => state.auth);
  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-4 d-flex justify-content-center">
            <div className="card">
              <div className="card-body">
                <img
                  src={profile.profileImg}
                  className="card-img-top circle-img circle-img--small mx-auto"
                  alt="Profile Image"
                />
                <h5 className="card-title text-center justify-center">{profile.name}</h5>
                <p className="card-text">Email: {profile.email}</p>
                <p className="card-text">Mobile: {profile.mobile}</p>
                <p className="card-text">Company: {profile.company}</p>
                <p className="card-text">Location: {profile.location}</p>
                <button className="btn btn-primary">Change Password</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RecruiterProfile