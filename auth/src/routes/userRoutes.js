const express = require("express");
const router = express.Router();
const { userAuth } = require("../middlewares/userAuth");
const {
  verifyOtp,
  editProfile,
  sendOtp,
  logout,
} = require("../controllers/user");

router.post("/send-otp", sendOtp);
router.post("/verfiy-otp", verifyOtp);
router.post("/logout", userAuth, logout);
router.patch("/edit-profile", userAuth, editProfile);

module.exports = router;
