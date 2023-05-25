const router = require('express').Router();
const { registerRecruiter, loginRecruiter, logoutRecruiter } = require('../controllers/recruiter.controller');
const upload = require("../middlewares/fileUpload")

router.post("/register", upload.single("profileImg"), registerRecruiter);
router.post("/login", loginRecruiter);
router.post("/logout", logoutRecruiter)

module.exports = router;