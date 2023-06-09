const JobApply = require("../models/jobApply.model");
const Job = require("../models/job.model");

//apply for job
const applyForJob = async (req, res) => {
  try {
    const { jobId, recruiterId } = req.body;

    const applyForJob = new JobApply({
      userId: req.user.id,
      jobId,
      recruiterId,
      resume: req.file.location,
    });

    await applyForJob.save();

    return res.status(200).json({ application: applyForJob });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

//get by recruiter id


const getByRecruiter = async (req, res) => {
  try {
    const application = await JobApply.find({ recruiterId: req.recruiter.id })
      .populate({
        path: "userId",
        select: "profileImg name mobile email",
      })
      .populate({ path: "jobId", select: "jobTitle" }); ;
    if (application == 0) {
      return res.status(400).json({ message: "No application found." });
    }
    return res.status(200).json({ applications: application });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

//get by user id
const getByUser = async (req, res) => {
  try {
    const application = await JobApply.find({ userId: req.user.id }).populate({
      path: "jobId",
      select: "salary jobTitle",
    }).populate({
      path: "recruiterId",
      select: "profileImg email company"
    });
    if (application == 0) {
      return res.status(400).json({ message: "No application found." });
    }
    return res.status(200).json({ applications: application });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const updateStatus = async (req,res) => {
  try{
    const {status} = req.body;

    const currentApplication = await JobApply.findOne({
      _id: req.params.id,
    }).populate('userId recruiterId');
    if (status === "accepted") {
      await JobApply.updateOne({ _id: req.params.id},{status})
      return res.status(200).json({message: `Request: ${req.params.id} accepted.`});
    } else if (status === "rejected") {
      await JobApply.updateOne({ _id: req.params.id }, { status });
      return res
        .status(200)
        .json({ message: `Request: ${req.params.id} accepted.` });
    }
  }catch(error) {
    return res.status(400).json({error: error.message})
  }
}



module.exports = {
  applyForJob,
  getByRecruiter,
  getByUser,
  updateStatus,
};


//get by recruiter
// const getByRecruiter = async (req, res) => {
//   try {
//     const application = await JobApply.find();
//     const recruiter = req.recruiter.id;
//     console.log(recruiter);
//     console.log(application.jobTitle);
//     console.log("ss", Job._id);
//     console.log("ff", JobApply.jobId);
//     if (Job.id == JobApply.jobId) {
//       return res.status(200).json({ applications: application });
//     } else {
//       return res.status(400).json({ message: "No Job Application found." });
//     }
//   } catch (error) {
//     return res.status(400).json({ error: error.message });
//   }
// };