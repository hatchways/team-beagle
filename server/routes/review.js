const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {
  newReview,
  reviewsforSitter,
  deleteReview,
  editReview,
} = require("../controllers/review");

router.route("/new-review/:sitterId").post(protect, newReview);
router.route("/:sitterId").get(protect, reviewsforSitter);
router.route("/delete/:reviewId").delete(protect, deleteReview);
router.route("/edit-review/:reviewId").patch(protect, editReview);

module.exports = router;
