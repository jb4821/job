const router = require("express").Router();
const upload = require('../middlewares/fileUpload')
const { registerUser, loginUser, logoutUser } = require('../controllers/user.controller');

router.post("/register", upload.single("profileImg"), registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

module.exports = router;
