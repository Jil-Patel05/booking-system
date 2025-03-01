const express = require("express");
const router = express.Router();
const { masterAdminAuth } = require("../middlewares/masterAdminAuth");
const { adminAuth } = require("../middlewares/adminAuth");
const {
  editProfileAdmin,
  resetFirstAdminPassword,
  createAdmin,
  loginAdmin,
  logoutAdmin,
  editAdmin,
  getSingleAdmin,
  deleteAdmin,
  getUsers,
  resetPassword,
  setPassword,
} = require("../controllers/admin");
const {
  masterAdminAndAdminAuth,
} = require("../middlewares/masterAdminAndAdminAuth");

// masterAdmin and admin common things
router.get("/login", loginAdmin);
router.post("/logout", masterAdminAndAdminAuth, logoutAdmin);
router.patch("/editprofile", adminAuth, editProfileAdmin);
router.patch("/resetfirstpassword", adminAuth, resetFirstAdminPassword);
router.patch("/passwordreset", adminAuth, resetPassword);
router.patch("/setpassword", adminAuth, setPassword);

// masterAdmin things
router.get("/editadmin", masterAdminAuth, editAdmin);
router.get("/getsingleadmin/:id", masterAdminAuth, getSingleAdmin);
router.get("/getadmins", masterAdminAuth, getUsers);
router.post("/createadmin", masterAdminAuth, createAdmin);
router.patch("/deleteadmin/:id", masterAdminAuth, deleteAdmin);

module.exports = router;
