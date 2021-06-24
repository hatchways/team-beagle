const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const multer = require("multer")
const { storage } = require("../cloudinary")
const upload = multer({ storage })
const {
  newProfile,
  editProfile,
  getProfile,
  findSitters,
  uploadPhoto
} = require("../controllers/profile");

router.route("/new-profile").post(protect, newProfile);
router.route("/edit-profile/:id").patch(protect, editProfile);
router.route("/get-profile/:id").get(protect, getProfile);
router.route("/sitters").get(protect, findSitters);
router.route("/upload-photo").post(upload.single("file"), uploadPhoto)

module.exports = router;
