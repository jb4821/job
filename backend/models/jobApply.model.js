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

  status: {
    type: String,
    default: "pending",
    enum: ["pending", "inprogress", "completed", "cancelled"],
  },

  applyedAt: {
    type: Date,
    default: Date.now,
  },
});

const JobApply = mongoose.model("JobApply", jobApplySchema);

module.exports = JobApply;
