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

// const changePassword =  async (req, res) => {
//   const { currentPassword, newPassword } = req.body;
//   // const userId = req.user._id;

//   try {
//     // Implement your logic to verify the current password and update the new password
//     const user = await User.find({_id:req.user._id}); // Replace 'User' with your actual user model
// console.log("dfd");
// console.log(currentPassword);
// console.log(newPassword);
// console.log(user.name);
// console.log(user);
// console.log(req.user._id);
// console.log(user._id)
//  const password = user.map(async (item) => {
//    console.log(item.password);

//    const isMatch = await bcrypt.compare(currentPassword, item.password);
//    console.log("hkjhh");
//    if (!isMatch) {
//      return res.status(401).json({ error: "Invalid current password" });
//    }

//    const hashedPassword = await bcrypt.hash(newPassword, 10);

//    user.password = hashedPassword;
//    await user.save();
//  });
//     res.status(200).json({ message: "Password changed successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: error.message });
//   }
// };

const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    const users = await User.find({ id: req.user.id });

    for (const user of users) {
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      console.log("match",isMatch);
      if (!isMatch) {
        return res.status(401).json({ error: "Invalid current password" });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await user.save();
    }

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
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
