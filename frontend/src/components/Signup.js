import React, { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import "./Signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    gender: "",
    password: "",
    confirmPassword: "",
  });

  const { name, email, mobile, gender, password, confirmPassword } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-controll"
              id="name"
              name="name"
              value={name}
              placeholder="Enter your name"
              onChange={onChange}
            />
            <input
              type="email"
              className="form-controll"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={onChange}
            />
            <input
              type="number"
              className="form-controll"
              id="mobile"
              name="mobile"
              value={mobile}
              placeholder="Enter your mobile"
              onChange={onChange}
            />
            <input
              type="text"
              className="form-controll"
              id="gender"
              name="gender"
              value={gender}
              placeholder="Enter your gender"
              onChange={onChange}
            />
            <input
              type="password"
              className="form-controll"
              id="password"
              name="password"
              value={password}
              placeholder="Enter your password"
              onChange={onChange}
            />
            <input
              type="password"
              className="form-controll"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              placeholder="Enter your confirmPassword"
              onChange={onChange}
            />
          </div>
          <div className="formgroup">
            <button type="submit" className="btn btn-block">
              {" "}
              Submit{" "}
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Signup;
