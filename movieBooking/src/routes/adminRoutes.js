const express = require("express");
const {
  addCity,
  editCity,
  getAllCity,
  getCity,
} = require("../controllers/admin");
const {
  masterAdminAndAdminAuth,
} = require("../middlewares/masterAdminAndAdminAuth");
const { commonAuth } = require("../middlewares/commonAuth");
const router = express.Router();

router.get("/getallcity/:userId", masterAdminAndAdminAuth, getAllCity);
router.get("/getcity/:userId/:cityId", masterAdminAndAdminAuth, getCity);
router.post("/addcity", commonAuth, addCity);
router.patch("/editcity", commonAuth, editCity);

module.exports = router;
