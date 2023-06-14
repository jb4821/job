const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/user.model");
const Recruiter = require("../models/recruiter.model");

const auth = async (req, res, next) => {
  try {
    
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role === "user") {
      const user = await User.findOne({
        _id: decoded._id,
       
      });

      
      if (!user) {
        return res.status(400).json({ message: "User not found." });
      }
      req.user = user;
    } else if (decoded.role === "recruiter") {
      const recruiter = await Recruiter.findOne({
        _id: decoded._id,
      });
      
      if (!recruiter) {
        return res.status(400).json({ message: "recruiter not found." });
      }
   
      req.recruiter = recruiter;
    }
    req.token = token;
    next();
  } catch (error) {
    if (error.message === "jwt expired") {
      return res
        .status(401)
        .json({ error: "Session Expired.Please Login again." });
    }
    return res.status(401).json({ message: "Authoraization required" });
  }
};

module.exports = auth;
