const JobApply = require("../models/jobApply.model");
const Job = require("../models/job.model");
const {
  sendApplyJobMail,
  sendAcceptJobMail,
  sendRejectJobMail,
} = require("../utils/Mail");

//apply for job

const applyForJob = async (req, res) => {
  try {
    const { jobId, recruiterId } = req.body;

    const existingApplication = await JobApply.findOne({
      userId: req.user.id,
      jobId,
    });

    if (existingApplication) {
      return res.status(400).json({
        message: "You have already applied for this job.",
        toast: true,
      });
    }

    const applyForJob = new JobApply({
      userId: req.user.id,
      jobId,
      recruiterId,
      resume: req.file.location,
    });

    await applyForJob.save();

    const applyMessage = `Your request for <b>JobApplied ID : </b>#${applyForJob._id} is Applied successfully.</br> Resume: ${applyForJob.resume}`;
    sendApplyJobMail(req.user.email, applyMessage);

    return res.status(200).json({
      message: "Job Request Applied Successfully.",
      application: applyForJob,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

//get by recruiter id

const getByRecruiter = async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const skipIndex = (page - 1) * 3;
    const allApplication = await JobApply.find({
      recruiterId: req.recruiter._id,
    });
    const application = await JobApply.find({ recruiterId: req.recruiter.id })
      .populate({
        path: "userId",
        select: "profileImg name mobile email",
      })
      .populate({ path: "jobId", select: "jobTitle" })
      .sort({ createdAt: -1 })
      .limit(3)
      .skip(skipIndex);
    if (application == 0) {
      return res.status(400).json({ message: "No application found." });
    }
    return res
      .status(200)
      .json({ applications: application, length: allApplication.length });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

//get by user id

const getByUser = async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const skipIndex = (page - 1) * 3;
    const allApplication = await JobApply.find({
      userId: req.user._id,
    });
    const application = await JobApply.find({ userId: req.user.id })
      .populate({
        path: "jobId",
        select: "salary jobTitle",
      })
      .populate({
        path: "recruiterId",
        select: "profileImg email company",
      })
      .sort({ createdAt: -1 })
      .limit(3)
      .skip(skipIndex);
    if (application == 0) {
      return res.status(400).json({ message: "No application found." });
    }
    return res
      .status(200)
      .json({ applications: application, length: allApplication.length });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

//update status

// const updateStatus = async (req, res) => {
//   try {
//     const { status } = req.body;

//     const currentApplication = await JobApply.findOne({
//       _id: req.params.id,
//     }).populate("userId recruiterId");
//     if (status === "accepted") {
//       await JobApply.updateOne({ _id: req.params.id }, { status });
//       const mailmessage = `Your application with <b> JobApplied ID: </b>${currentApplication._id} is Accepted by ${currentApplication.recruiterId.name}.`;
//       sendAcceptJobMail(currentApplication.userId.email, mailmessage);

//       return res
//         .status(200)
//         .json({ message: `Request: ${req.params.id} accepted.` });
//     } else if (status === "rejected") {
//       await JobApply.updateOne({ _id: req.params.id }, { status });
//       const mailmessage = `Your application with <b>JobApplied ID: </b>${currentApplication._id} is Rejected.`;
//       sendRejectJobMail(currentApplication.userId.email, mailmessage);

//       return res
//         .status(200)
//         .json({ message: `Request: ${req.params.id} accepted.` });
//     }
//   } catch (error) {
//     return res.status(400).json({ error: error.message });
//   }
// };

const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const currentApplication = await JobApply.findOne({
      _id: req.params.id,
    }).populate("userId recruiterId");

    if (status === "accepted" || status === "rejected") {
      // Update the status of the current application
      await JobApply.updateOne({ _id: req.params.id }, { status });

      // Update the status of other job applications by the same user
      await JobApply.updateMany(
        {
          _id: { $ne: req.params.id }, // Exclude the current application
          userId: currentApplication.userId,
          status: { $ne: "closed" }, // Only update applications that are not already closed
        },
        { $set: { status: "closed" } }
      );

      // Send emails or notifications if needed

      return res
        .status(200)
        .json({ message: `Request: ${req.params.id} updated successfully.` });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};


module.exports = {
  applyForJob,
  getByRecruiter,
  getByUser,
  updateStatus,
};
