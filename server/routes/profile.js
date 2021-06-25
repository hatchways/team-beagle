const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const multer = require("multer");
const { uploader, storage } = require("../cloudinary");
const upload = multer({ storage });
const {
  newProfile,
  editProfile,
  getProfile,
  findSitters,
  uploadPhoto,
  changeMainPhoto,
  deletePhoto,
  findSittersByLocation,
} = require("../controllers/profile");

router.route("/new-profile").post(protect, newProfile);
router.route("/edit-profile/:id").patch(protect, editProfile);
router.route("/get-profile/:id").get(protect, getProfile);
router.route("/sitters").get(protect, findSitters);
router.route("/upload-photo").post(upload.single("file"), uploadPhoto);
router.route("/change-main-photo/:id").patch(protect, changeMainPhoto);
router.route("/delete-photo").delete(protect, deletePhoto);
router.route("/location/:search").get(protect, findSittersByLocation);

module.exports = router;
