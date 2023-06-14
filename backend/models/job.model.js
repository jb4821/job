const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    jobTitle: {
      type: String,
      trim: true,
      required: true,
    },

    category: {
      type: String,
      trim: true,
      required: true,
    },

    recruiterId: {
      type: mongoose.Types.ObjectId,
      ref: "Recruiter",
    },

    description: {
      type: String,
      trim: true,
      required: true,
    },

    salary: {
      type: String,
      required: true,
    },

    experience: {
      type: String,
      trim: true,
      required: true,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
