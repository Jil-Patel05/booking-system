const express = require("express");
const router = express.Router();
const {
  masterAdminAndAdminAuth,
} = require("../middlewares/masterAdminAndAdminAuth");
const { ownerAuth } = require("../middlewares/ownerAuth");
const {
  editProfileOwner,
  resetFirstOwnerPassword,
  createOwner,
  loginOwner,
  logoutOwner,
  editOwner,
  getSingleOwner,
  deleteOwner,
  getOwners,
  resetPassword,
  setPassword,
} = require("../controllers/owner");

// owner and admin common things
router.get("/login", loginOwner);
router.post("/logout", ownerAuth, logoutOwner);
router.patch("/editprofile", ownerAuth, editProfileOwner);
router.patch("/resetfirstpassword", ownerAuth, resetFirstOwnerPassword);
router.patch("/passwordreset", ownerAuth, resetPassword);
router.patch("/setpassword", ownerAuth, setPassword);

// admin things
router.get("/editowner", masterAdminAndAdminAuth, editOwner);
router.get("/getsingleowner/:id", masterAdminAndAdminAuth, getSingleOwner);
router.get("/getowners", masterAdminAndAdminAuth, getOwners);
router.post("/createowner", masterAdminAndAdminAuth, createOwner);
router.patch("/deleteowner/:id", masterAdminAndAdminAuth, deleteOwner);

module.exports = router;
