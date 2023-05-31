import React from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/slices/authSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.auth);

  const handleClick = () => {
    localStorage.clear()
    navigate("/")
  }

  
  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <span className="text">
            {" "}
            <Link to={"/"}>Job Recruiter</Link>{" "}
          </span>
        </div>
        <div className="links">
          <span>
            <Link to={"/"}>Home</Link>
          </span>
          <span>
            <Link to={"/jobs"}>Jobs</Link>
          </span>
          <span>
            <Link to={"/about"}>About</Link>
          </span>
          <span>
            {" "}
            <Link to={"/contect"}>Contact</Link>
          </span>
          {profile ? (
            <ul>
              <button onClick={handleClick}>Logout</button>
            </ul>
          ) : (
            <>
              <span>
                <Link to={"/login"}>LogIn </Link>
              </span>
              <span>
                <Link to={"/usersignup"}> UserSignUp</Link>
              </span>
              <span>
                <Link to={"/recruitersignup"}> RecruiterSignUp</Link>
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
