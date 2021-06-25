const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {
  newRequest,
  editRequest,
  requestsByUser,
  requestsforSitter,
  requestsforCurrentUserSitter,
  requestsforCurrentUserOwner,
} = require("../controllers/request");

router.route("/new-request").post(newRequest);
router.route("/edit-request/:id").patch(protect, editRequest);
router.route("/user/:id").get(protect, requestsByUser);
router.route("/sitter/:id").get(protect, requestsforSitter);
router.route("/bookings/sitter").get(protect, requestsforCurrentUserSitter);
router.route("/bookings/owner").get(protect, requestsforCurrentUserOwner);

module.exports = router;
