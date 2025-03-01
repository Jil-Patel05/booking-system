const express = require("express");
const { addCity } = require("../controllers/admin/addCity");
const router = express.Router();

router.get("/addcity", addCity);


module.exports = router;