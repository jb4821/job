import React from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../redux/slices/userSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };
  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <span className="text"> <Link to= {'/'}>Job Recruiter</Link> </span>
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
              <li>
                <button onClick={onLogout}>Logout</button>
              </li>
            ) : (
              <>
                <span>
                  <Link to={"/login"}>LogIn </Link>
                </span>
                <span>
                  <Link to={"/signup"}> UserSignUp</Link>
                </span>
              </>
            )}
          
        </div>
      </div>
    </div>
  );
};

export default Navbar;
