import React from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../redux/slices/userSlice";

const Navbar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const{ user} = useSelector((state) => state.user)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }
  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <span className="text"> Job Recruiter </span>
        </div>
        <div className="links">
          <span>Home</span>
          <span>Jobs</span>
          <span>About</span>
          <span>Contact</span>
          <ul>
            {user ? (
              <li>
                <button onClick={onLogout}>Logout</button>
              </li>
            ) : (
              <>
                <li>
                  <Link to={"/login"}>Login</Link>
                </li>
                <li>
                  <Link to={"/signup"}>SignUp</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
