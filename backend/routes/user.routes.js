const router = require("express").Router();
const { imgUpload } = require("../middlewares/fileUpload");
const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../controllers/user.controller");

router.post("/register", imgUpload.single("profileImg"), registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

module.exports = router;
