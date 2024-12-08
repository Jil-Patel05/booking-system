const express = require("express");
const router = express.Router();
const { masterAdminAuth } = require("../middlewares/masterAdminAuth");
const { adminAuth } = require("../middlewares/adminAuth");
const {
  editProfileAdmin,
  resetAdminPassword,
  createAdmin,
  loginAdmin,
  logoutAdmin,
} = require("../controllers/admin");

router.post("/createadmin", masterAdminAuth, createAdmin);
router.patch("/editprofile", adminAuth, editProfileAdmin);
router.patch("/resetpassword", adminAuth, resetAdminPassword);
router.get("/login", loginAdmin);
router.post("/logout", adminAuth, logoutAdmin);

module.exports = router;
