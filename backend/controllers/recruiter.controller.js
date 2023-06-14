const Recruiter = require("../models/recruiter.model");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Register recruiter

const registerRecruiter = async (req, res) => {
  try {
    const {
      name,
      email,
      mobile,
      company,
      location,
      password,
    } = req.body;

    const recruiterExists = await Recruiter.findOne({ email });
    if (recruiterExists) {
      return res.status(400).json({ message: "Recruiter already exists!!!" });
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const recruiter = new Recruiter({
      name,
      email,
      mobile,
      company,
      location,
      password: hashPassword,
      profileImg: req.file.location,
    });
    await recruiter.save();

    const token = await recruiter.generateAuthToken();
    return res.status(201).json({
      recruiter: recruiter.toJSON(),
      token,
    });
   
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//Login recruiter

const loginRecruiter = async (req, res) => {
  try {
    const { email, password } = req.body;

    const recruiter = await Recruiter.findOne({ email });

    if (!recruiter) {
      return res
        .status(400)
        .json({ message: "Please enter correct email or password" });
    }

    const isPassword = await bcrypt.compare(password, recruiter.password);

    if (!isPassword) {
      return res
        .status(401)
        .json({ message: "Please enter correct email or password." });
    }
    const token = await recruiter.generateAuthToken();
    return res.status(200).json({ recruiter: recruiter.toJSON(), token });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// get Recruiter Profile

const getProfile = (req, res) => {
  try {
    const recruiter = req.recruiter;
    return res.status(200).json({
      recruiter: recruiter.toJSON(),
    });
  } catch (error) {
    return res.status(404).json({ error: "Recruiter not found." });
  }
};

//Logout recruiter

const logoutRecruiter = async (req, res) => {
  try {
    req.recruiter = null;
    return res.status(200).json({ message: "Logged out successfully." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


module.exports = {
  registerRecruiter,
  loginRecruiter,
  getProfile,
  logoutRecruiter,
};
