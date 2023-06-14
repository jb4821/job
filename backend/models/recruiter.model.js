const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
require("dotenv");

const recruiterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },

    email: {
      type: String,
      trim: true,
      required: true,
      lowerCase: true,
      unique: true,
      validate: [validator.isEmail, "Please provide valid email."],
    },

    mobile: {
      type: Number,
      trim: true,
      required: true,
    },

    profileImg: {
      type: String,
      required: true,
    },

    company: {
      type: String,
      trim: true,
      required: true,
    },

    location: {
      type: String,
      trim: true,
      required: true,
    },

    password: {
      type: String,
      trim: true,
    },
    passwordChangedAt: String,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    timestamps: true,
  }
);

recruiterSchema.methods.generateAuthToken = async function () {
  const recruiter = this;
  const token = jwt.sign(
    { _id: recruiter._id.toString(), role: "recruiter" },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
  return token;
};

recruiterSchema.methods.toJSON = function () {
  const recruiter = this;
  const recruiterObject = recruiter.toObject();
  delete recruiterObject.password;
  delete recruiterObject.createdAt;
  delete recruiterObject.updatedAt;
  delete recruiterObject.__v;
  return recruiterObject;
};

recruiterSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

module.exports = mongoose.model("Recruiter", recruiterSchema);
