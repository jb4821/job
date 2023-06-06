const JobApply = require("../models/jobApply.model");

//apply for job
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

//get by recruiter id
const getByRecruiter = async(req,res) => {
  try{
    const application = await JobApply.find({recruiterId: req.recruiter.id})
    if(application == 0){
      return res.status(400).json({message: "No application found."})
    }
    return res.status(200).json({applications: application})
  }catch(error) {
    return res.status(400).json({error: error.message})
  }
}

//get by user id
const getByUser = async(req,res) => {
  try{
    const application = await JobApply.find({userId: req.user.id})
    if(application == 0){
      return res.status(400).json({message: "No application found."})
    }
    return res.status(200).json({applications: application})
  }catch(error) {
    return res.status(400).json({error: error.message})
  }
}

module.exports = {
  applyForJob,
  getByRecruiter,
  getByUser,
};
