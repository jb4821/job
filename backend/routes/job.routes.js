const router = require("express").Router();
const {
  createJob,
  updateJob,
  deleteJob,
  getAllJob,
  getJobByTitle,
  getByCategory,
  getJobBySalary,
  getJobByTime,
  getJobsByLocation,
  getJobbyrecruiter,
  getJobbyid,
} = require("../controllers/job.controller");

const auth = require("../middlewares/auth");

router.post("/create", auth, createJob);
router.put("/update/:id", auth, updateJob);
router.delete("/delete/:id", auth, deleteJob);
router.get("/allJob", auth, getAllJob);
router.get("/jobbyid/:id", auth, getJobbyid);
router.get("/jobbyrecruiter", auth, getJobbyrecruiter);
router.get("/jobBytitle", auth, getJobByTitle);
router.get("/jobByCategory", auth, getByCategory);
router.get("/jobBySalary", auth, getJobBySalary);
router.get("/jobByTime", auth, getJobByTime);
router.get("/jobByLocation", auth, getJobsByLocation);

module.exports = router;
