const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },

    mobile: {
      type: Number,
      trim: true,
      required: true,
    },

    gender: {
      type: String,
      trim: true,
      required: true,
    },

    // location: {
    //   type: String,
    //   trim: true,
    //   required: true,
    // },

    password: {
      type: String,
      trim: true,
      required: true,
    },

    // confirmPassword: {
    //   type: String,
    // },

    profileImg: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign(
    { _id: user._id.toString(), role: "user" },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
  return token;
};

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.createdAt;
  delete userObject.updatedAt;
  delete userObject.__v;
  return userObject;
};

module.exports = mongoose.model("User", userSchema);
