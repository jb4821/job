const User = require("../models/user.model");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//Register User

const registerUser = async (req, res) => {
  try {
    const { name, email, mobile, gender, location, password, confirmPassword } =
      req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User is already exists." });
    }

    if (password === confirmPassword) {
      const hashPassword = await bcrypt.hash(password, 10);

      const user = new User({
        name,
        email,
        mobile,
        gender,
        location,
        password: hashPassword,
        profileImg: req.file.location,
      });
      await user.save();

      const token = await user.generateAuthToken();
      return res.status(201).json({ user: user.toJSON(), token });
    } else {
      return res
        .status(400)
        .json({ message: "Password and confirmPassword are not same" });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Login User

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Please enter correct email or password" });
    }
    const isPassword = await bcrypt.compare(password, user.password);

    if (!isPassword) {
      return res
        .status(401)
        .json({ message: "Please enter correct email or password" });
    }
    const token = await user.generateAuthToken();
    return res.status(200).json({
      user: user.toJSON(),
      token,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Logout User

const logoutUser = async (req, res) => {
  try {
    req.user = null;
    return res.status(200).json({ message: " Logged out successfully." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser, logoutUser };
