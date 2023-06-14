const Job = require("../models/job.model");

//create job

const createJob = async (req, res) => {
  try {
    const { jobTitle, category, description, salary, experience } = req.body;
    const recruiter = req.recruiter;

    const job = new Job({
      jobTitle,
      category,
      description,
      salary,
      experience,
      recruiterId: recruiter._id,
    });

    await job.save();

    await job.populate({
      path: "recruiterId",
      select: "company location",
    });
    return res.status(201).json({ job });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//update job

const updateJob = async (req, res) => {
  try {
    const job = await Job.findOne({
      _id: req.params.id,
      isDeleted: false,
    });

    if (!job) {
      return res.status(404).json({ message: "Job not found!" });
    }

    if (job.recruiterId == req.recruiter.id) {
      try {
        const updatejob = await Job.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        return res.status(201).json({ jobs: "JOb Updated", Job: updatejob });
      } catch (error) {
        return res.status(400).json({ message: error.message });
      }
    } else {
      return res.status(403).json({ message: "You can update only your job" });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// delete job

const deleteJob = async (req, res) => {
  try {
    const job = await Job.findOne({
      _id: req.params.id,
      isDeleted: false,
    });

    if (!job) {
      return res.status(404).json({ message: "Job not found!" });
    }

    if (job.recruiterId == req.recruiter.id) {
      job.isDeleted = true;
      await job.save();
      return res.status(200).json({ message: "Job deleted " });
    } else {
      return res.status(400).json({ message: "you can not delete this job." });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// get job by recruiter

const getJobbyrecruiter = async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const skipIndex = (page - 1) * 3;

    const allJobs = await Job.find({
      recruiterId: req.recruiter._id,
      isDeleted: false,
    });

    const jobs = await Job.find({
      recruiterId: req.recruiter._id,
      isDeleted: false,
    })
      .populate({ path: "recruiterId", select: "profileImg company location" })
      .sort({ createdAt: -1 })
      .limit(3)
      .skip(skipIndex);
    return res.status(200).json({ jobs, length: allJobs.length });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

//get all job

const getAllJob = async (req, res) => {
  const query = req.query;

  const filters = {
    ...(query.title && { jobTitle: { $regex: query.title, $options: "i" } }),
    ...(query.category && {
      category: { $regex: query.category, $options: "i" },
    }),
    ...(query.salary && { salary: { $regex: query.salary, $options: "i" } }),
  };
  try {
    const page = parseInt(req.query.page);
    const skipIndex = (page - 1) * 3;

    const allJob = await Job.find({ isDeleted: false, ...filters });
    const jobs = await Job.find({ isDeleted: false, ...filters })
      .populate({
        path: "recruiterId",
        select: "profileImg location company",
      })
      .sort({ createdAt: -1 })
      .limit(3)
      .skip(skipIndex);
    if (jobs.length > 0) {
      return res.status(200).json({ jobs, length: allJob.length });
    } else {
      return res.status(404).json({ message: "No jobs found!" });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// get job by id

const getJobbyid = async (req, res) => {
  try {
    const job = await Job.find({
      _id: req.params.id,
      isDeleted: false,
    });

    return res.status(200).json({ jobs: job });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createJob,
  updateJob,
  deleteJob,
  getJobbyrecruiter,
  getAllJob,
  getJobbyid,
};
