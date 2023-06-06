import React, { useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/slices/authSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { role, profile } = useSelector((state) => state.auth);

  const [menu, setmenu] = useState(false);

  const handleShowMenu = () => {
    setmenu((prevstate) => !prevstate);
  };

  const handleClick = () => {
    // console.log("IN Call");
    localStorage.clear();
    navigate("/login");
  };

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
          {role === "user" && (
            <>
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
                <Link to={"/contect"}>Contact</Link>
              </span>
              <span>
                <button onClick={handleClick}>Logout</button>
              </span>
              <a>
                <img
                  onClick={handleShowMenu}
                  src={profile?.profileImg}
                  width={50}
                  height={50}
                  alt=""
                />
              </a>
              {menu && (
                <div className="manageandlogin">
                  <Link to={"/userprofile"}>Profile</Link>
                  {/* <br /> */}
                  <a onClick={handleClick}>Logout</a>
                </div>
              )}
            </>
          )}
          {role === "recruiter" && (
            <>
              <span>
                <Link to={"/"}>Home</Link>
              </span>
              <span>
                <Link to={"/dashboard"}>Dashboard</Link>
              </span>
              <span>
                <Link to={"/addjob"}>Add Job</Link>
              </span>
              <span>
                <button onClick={handleClick}>Logout</button>
              </span>
              <a>
                <img
                  onClick={handleShowMenu}
                  src={profile?.profileImg}
                  width={50}
                  height={50}
                  alt=""
                />
              </a>
              {menu && (
                <div className="manageandlogin">
                  <Link to={"/profile"}>Profile</Link>
                  <br />
                  <Link to={"/profile"}>Profile</Link>
                  <br />
                  <Link to={"/profile"}>Profile</Link>
                  <br />
                  <a onClick={handleClick}>Logout</a>
                </div>
              )}
            </>
          )}
          {!role && (
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
