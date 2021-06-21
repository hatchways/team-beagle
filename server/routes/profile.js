const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {
  newUser,
  editProfile,
  getProfile,
  findSitters,
} = require("../controllers/profile");

router.route("/").post(protect, newUser);
router.route("/:id").patch(protect, editProfile);
router.route("/:id").get(protect, getProfile);
router.route("/sitters").get(protect, findSitters);

module.exports = router;
