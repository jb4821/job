const JobApply = require("../models/jobApply.model");

const applyForJob = async (req, res) => {
  try {
    const { recruiterId } = req.body;

    const applyForJob = new JobApply({
      userId: req.user.id,
      recruiterId,
      resume: req.file.location,
    });

    await applyForJob.save();

    return res.status(200).json({ message: applyForJob });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  applyForJob,
};
