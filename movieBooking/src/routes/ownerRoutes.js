const express = require("express");
const { ownerAuth } = require("../middlewares/ownerAuth");
const {
  addCinema,
  editCinema,
  getCinema,
  getAllCinema,
} = require("../controllers/owner/cinema");
const {
  addScreen,
  editScreen,
  getAllScreen,
} = require("../controllers/owner/screen");
const router = express.Router();

router.post("/addcinema", ownerAuth, addCinema);
router.patch("/editcinema", ownerAuth, editCinema);
router.get("/getcinema/:userId/:id", ownerAuth, getCinema);
router.get("/getallcinema/:userId", ownerAuth, getAllCinema);

router.post("/addscreen", ownerAuth, addScreen);
router.patch("/editscreen", ownerAuth, editScreen);
// router.get("/getcinema/:userId/:id", ownerAuth, getCinema);
router.get("/getallscreen/:userId", ownerAuth, getAllScreen);

module.exports = router;
