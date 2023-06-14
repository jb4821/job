import React, { useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Avatar } from "@mui/material";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { role, profile } = useSelector((state) => state.auth);

  const [menu, setmenu] = useState(false);

  const handleShowMenu = () => {
    setmenu((prevstate) => !prevstate);
  };

  const handleClick = () => {
    localStorage.clear();
    navigate("/login");
  };

  const token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : null;

  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <span className="text">
            <Link to={"/"}>Talent Spot</Link>{" "}
          </span>
        </div>
        <div className="links">
          {token && role === "user" && (
            <>
              <span>
                <Link to={"/"}>Home</Link>
              </span>
              <span>
                <Link to={"/jobs"}>Jobs</Link>
              </span>
            

              <a onClick={handleShowMenu}>
                <Avatar src={profile?.profileImg} />
                
              </a>
              {menu && (
                <div className="manageandlogin">
                  <Link to={"/userprofile"}>Profile </Link>
                  <br />
                  <Link to={"/userapplication"}>Applied Job</Link>
                  <br />
                  <a onClick={handleClick}>Logout</a>
                </div>
              )}
            </>
          )}
          {token && role === "recruiter" && (
            <>
              <span>
                <Link to={"/dashboard"}>Dashboard</Link>
              </span>
              <span>
                <Link to={"/addjob"}>Add Job</Link>
              </span>

              <a onClick={handleShowMenu}>
                <Avatar src={profile?.profileImg} />
                
              </a>
              {menu && (
                <div className="manageandlogin">
                  <Link to={"/recruiterprofile"}>Profile</Link>
                  <br />
                  <Link to={"/recruiterapplication"}>Applications</Link>
                  <br />
                  <a onClick={handleClick}>Logout</a>
                </div>
              )}
            </>
          )}
          {!token && (
            <>
              <span>
                <Link to={"/"}>Home</Link>
              </span>
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
