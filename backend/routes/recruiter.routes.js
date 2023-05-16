const router = require('express').Router();
const { registerRecruiter, loginRecruiter, logoutRecruiter } = require('../controllers/recruiter.controller');

router.post("/register", registerRecruiter);
router.post("/login", loginRecruiter);
router.post("/logout", logoutRecruiter)

module.exports = router;