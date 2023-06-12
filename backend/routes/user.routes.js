const router = require("express").Router();
const { imgUpload } = require("../middlewares/fileUpload");
const {
  registerUser,
  loginUser,
  getProfile,
  logoutUser,
  forgotPassword,
  resetPassword,
  changePassword,
} = require("../controllers/user.controller");
const auth = require("../middlewares/auth");

router.post("/register", imgUpload.single("profileImg"), registerUser);
router.post("/login", loginUser);
router.get("/profile", auth, getProfile);
router.post("/logout", auth, logoutUser);

router.post("/forgotpassword", forgotPassword);
router.post("/resetpassword/:token", resetPassword);
router.post("/changepassword", auth, changePassword);


module.exports = router;
