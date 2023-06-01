const router = require("express").Router();
const {
  registerRecruiter,
  loginRecruiter,
  getProfile,
  logoutRecruiter,
} = require("../controllers/recruiter.controller");
const { imgUpload } = require("../middlewares/fileUpload");
const auth = require("../middlewares/auth");

router.post("/register", imgUpload.single("profileImg"), registerRecruiter);
router.post("/login", loginRecruiter);
router.get("/profile", auth, getProfile);
router.post("/logout", auth, logoutRecruiter);

module.exports = router;
