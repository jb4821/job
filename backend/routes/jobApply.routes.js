const router = require("express").Router();
const { applyForJob } = require("../controllers/jobApply.controller");
const auth = require("../middlewares/auth");
const upload = require("../middlewares/fileUpload");

router.post("/apply", auth, upload.single("resume"), applyForJob);

module.exports = router;
