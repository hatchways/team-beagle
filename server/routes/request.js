const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {
  newRequest,
  editRequest,
  requestsforCurrentUserSitter,
  requestsforCurrentUserOwner,
  requestsDelete,
} = require("../controllers/request");

router.route("/new-request").post(newRequest);
router.route("/edit-request/:id").patch(protect, editRequest);
router.route("/bookings/sitter").get(protect, requestsforCurrentUserSitter);
router.route("/bookings/owner").get(protect, requestsforCurrentUserOwner);
router.route("/delete/:id").delete(protect, requestsDelete);

module.exports = router;
