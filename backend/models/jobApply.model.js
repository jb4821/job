const mongoose = require("mongoose");
const Job = require("./job.model");

const jobApplySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },

  recruiterId: {
    type: mongoose.Types.ObjectId,
    ref: "Recruiter",
  },

  resume: {
    type: String,
    required: true,
  },

  applyedAt: {
    type: Date,
    default: Date.now,
  },
});

const JobApply = mongoose.model("JobApply", jobApplySchema);

module.exports = JobApply;
