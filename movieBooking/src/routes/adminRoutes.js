const express = require("express");
const { addCity } = require("../controllers/admin/addCity");
const {
  masterAdminAndAdminAuth,
} = require("../middlewares/masterAdminAndAdminAuth");
const router = express.Router();

router.get("/addcity", masterAdminAndAdminAuth, addCity);

module.exports = router;
