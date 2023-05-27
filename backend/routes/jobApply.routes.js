const router = require("express").Router();
const { applyForJob } = require("../controllers/jobApply.controller");
const auth = require("../middlewares/auth");
const { fileUpload } = require("../middlewares/fileUpload");

router.post("/apply", auth, fileUpload.single("resume"), applyForJob);

module.exports = router;
