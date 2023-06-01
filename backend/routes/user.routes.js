const router = require("express").Router();
const { imgUpload } = require("../middlewares/fileUpload");
const {
  registerUser,
  loginUser,
  getProfile,
  logoutUser,
} = require("../controllers/user.controller");
const auth = require("../middlewares/auth");

router.post("/register", imgUpload.single("profileImg"), registerUser);
router.post("/login", loginUser);
router.get("/profile", auth, getProfile);
router.post("/logout", auth, logoutUser);

module.exports = router;
