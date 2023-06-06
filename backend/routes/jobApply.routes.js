const router = require("express").Router();
const { applyForJob, getByRecruiter, getByUser } = require("../controllers/jobApply.controller");
const auth = require("../middlewares/auth");
const { fileUpload } = require("../middlewares/fileUpload");

router.post("/apply", auth, fileUpload.single("resume"), applyForJob);
router.get("/byrecruiter", auth, getByRecruiter);
router.get("/byuser", auth, getByUser);

module.exports = router;
