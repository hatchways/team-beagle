const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {
  getAllNotifications,
  getUnreadNotifications,
  newNotification,
  readNotification,
  readAllNotifications,
} = require("../controllers/notifications");

router.route("/all").get(protect, getAllNotifications);

router.route("/unread").get(protect, getUnreadNotifications);

router.route("/new").post(protect, newNotification);

router.route("/read/:id").patch(protect, readNotification);

router.route("/readall").patch(protect, readAllNotifications);

module.exports = router;
