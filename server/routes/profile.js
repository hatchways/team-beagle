const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {
  newUser,
  editProfile,
  getProfile,
  findSitters,
} = require("../controllers/profile");

router.route("/new").post(protect, newUser);
router.route("/editprofile/:id").patch(protect, editProfile);
router.route("/getprofile/:id").get(protect, getProfile);
router.route("/sitters").get(protect, findSitters);

module.exports = router;
