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
        return res.status(201).json({ message: "JOb Updated", Job: updatejob });
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
    console.log(job.recruiterId);
    console.log(req.recruiter.id);

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

//get all job

const getAllJob = async (req, res) => {
  try {
    const job = await Job.find({ isDeleted: false });
    if (job.length != 0) {
      return res.status(200).json({ job });
    } else {
      return res.status(404).json({ message: "Job not found!" });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// get by jobTitle

const getJobByTitle = async (req, res) => {
  try {
    const { title } = req.query;
    const job = await Job.find({
      jobTitle: { $regex: title, $options: "i" },
      isDeleted: false,
    });
    if (job.length != 0) {
      return res.status(200).json({ message: job });
    } else {
      return res
        .status(404)
        .json({ message: "Job with this title not found!" });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// get ny category

const getByCategory = async (req, res) => {
  try {
    const { category } = req.query;
    const job = await Job.find({
      category: { $regex: category, $options: "i" },
      isDeleted: false,
    });
    if (job.length != 0) {
      return res.status(200).json({ message: job });
    } else {
      return res
        .status(404)
        .json({ message: "With this category no job found!" });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// get by salary

const getJobBySalary = async (req, res) => {
  try {
    const { salary } = req.query;
    const job = await Job.find({
      salary: { $regex: salary, $options: "i" },
      isDeleted: false,
    });
    if (job.length != 0) {
      return res.status(200).json({ message: job });
    } else {
      return res
        .status(404)
        .json({ message: "Job with this salary not found!" });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// get by time

const getJobByTime = async (req, res) => {
  try {
    const { time } = req.query;
    const threshold = new Date();
    threshold.setHours(threshold.getHours() - time);

    const job = await Job.find({
      createdAt: { $gte: threshold },
      isDeleted: false,
    });
    if (job.length != 0) {
      return res.status(200).json({ job });
    } else {
      return res
        .status(404)
        .json({ message: "There is no job found in this time! " });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// get by location

const getJobsByLocation = async (req, res) => {
  try {
    const { location } = req.query;

    const job = await Job.find({ isDeleted: false })
      .populate({
        path: "recruiterId",
        match: { location: { $regex: location, $options: "i" } },
      })
      .exec();

    console.log(job.recruiterId);

    // const filteredJobs = job.filter((job) => job.location !== null);
    if (job.length != 0) {
      return res.status(200).json({ message: job });
    } else {
      return res
        .status(404)
        .json({ message: "This location there is no job found!" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createJob,
  updateJob,
  deleteJob,
  getAllJob,
  getJobByTitle,
  getByCategory,
  getJobBySalary,
  getJobByTime,
  getJobsByLocation,
};
