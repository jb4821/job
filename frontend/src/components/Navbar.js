import React from "react";
import "./Navbar.scss";

const Navbar = () => {
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
          <button>Login</button>
          <button>SignUp</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
