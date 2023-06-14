const User = require("../models/user.model");
const Recruiter = require("../models/recruiter.model");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { sendMail } = require("../utils/Mail");

//Register User

const registerUser = async (req, res) => {
  try {
    const { name, email, mobile, gender, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User is already exists." });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      mobile,
      gender,
      password: hashPassword,
      profileImg: req.file.location,
    });
    await user.save();

    const token = await user.generateAuthToken();
    return res.status(201).json({ user: user.toJSON(), token });
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

// get User Profile

const getProfile = (req, res) => {
  try {
    const user = req.user;
    return res.status(200).json({
      user: user.toJSON(),
    });
  } catch (error) {
    return res.status(404).json({ error: "User not found." });
  }
};

//forgot password

const forgotPassword = async (req, res) => {
  if (!req.body.email)
    return res
      .status(400)
      .json({ message: "Please provide your email address." });

  const user = await User.findOne({ email: req.body.email });

  // for recruiter
  if (!user) {
    const recruiter = await Recruiter.findOne({ email: req.body.email });
    if (!recruiter) {
      return res
        .status(404)
        .json({ message: "There is no user or recruiter with email" });
    }
    const resetToken = recruiter.createPasswordResetToken();
    await recruiter.save({ validateBeforeSave: false });

    const resetURL = `http://localhost:3000/reset-password/${resetToken}`;

    const message = `<h5>Forgot your password ?<h5> Go to this URL <a>${resetURL}</a>.\n If you did't forgot your password, please ignore this email!`;
    sendMail(req.body.email, message);

    return res.status(200).json({
      message: "Email sent Successfully.",
    });
  }

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  const resetURL = `http://localhost:3000/reset-password/${resetToken}`;

  const message = `<h5>Forgot your password ?<h5> Go to this URL <a>${resetURL}</a>.\n If you did't forgot your password, please ignore this email!`;
  sendMail(req.body.email, message);

  return res.status(200).json({
    message: "Email sent Successfully.",
  });
};

//reset password

const resetPassword = async (req, res) => {
  try {
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    // recruiter
    if (!user) {
      const recruiter = await Recruiter.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() },
      });

      if (!recruiter) {
        return res.status(400).json({
          message: "Token is invalid or expired. Please try again.",
        });
      }

      const hashpass = await bcrypt.hash(req.body.password, 10);

      recruiter.password = hashpass;
      recruiter.passwordResetToken = undefined;
      recruiter.passwordResetExpires = undefined;
      recruiter.save();
      return res.status(200).json({
        message: "Your Password has been changed successfully.",
      });
    }

    const hashpass = await bcrypt.hash(req.body.password, 10);

    user.password = hashpass;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    user.save();
    res.status(200).json({
      message: "Your Password has been changed successfully.",
    });
  } catch (error) {
    res.status(500).json({
      message: "Somthing wnt wrong.",
    });
  }
};

//change password

const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  try {
    // Validate the form data
    if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: "Please fill in all fields." });
    }

    let user;
    let recruiter;
    let isPasswordValid;

    if (req.user) {
      // User authentication
      user = await User.findOne({ _id: req.user.id });

      if (!user) {
        return res
          .status(401)
          .json({ message: "User not found.", toast: true });
      }

      isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    } else if (req.recruiter) {
      // Recruiter authentication
      recruiter = await Recruiter.findOne({ _id: req.recruiter.id });

      if (!recruiter) {
        return res
          .status(401)
          .json({ message: "Recruiter not found.", toast: true });
      }

      isPasswordValid = await bcrypt.compare(oldPassword, recruiter.password);
    } else {
      return res
        .status(401)
        .json({ message: "Unauthorized access.", toast: true });
    }

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Invalid old password.", toast: true });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's or recruiter's password
    if (user) {
      user.password = hashedPassword;
      await user.save();
    } else if (recruiter) {
      recruiter.password = hashedPassword;
      await recruiter.save();
    }

    return res
      .status(200)
      .json({ message: "Password changed successfully.", toast: true });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};



// Logout User

const logoutUser = async (req, res) => {
  try {
    req.user = null;
    localStorage.setItem("currentUser", null);
    navigate("/");
    return res.status(200).json({ message: " Logged out successfully." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getProfile,
  forgotPassword,
  resetPassword,
  changePassword
};
