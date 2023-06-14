const router = require("express").Router();
const {
  createJob,
  updateJob,
  deleteJob,
  getAllJob,
  getJobbyrecruiter,
  getJobbyid,
} = require("../controllers/job.controller");

const auth = require("../middlewares/auth");

router.post("/create", auth, createJob);
router.put("/update/:id", auth, updateJob);
router.delete("/delete/:id", auth, deleteJob);
router.get("/allJob", getAllJob);
router.get("/jobbyid/:id", auth, getJobbyid);
router.get("/jobbyrecruiter", auth, getJobbyrecruiter);

module.exports = router;
