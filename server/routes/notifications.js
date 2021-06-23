const express = require("express")
const protect = require("../middleware/auth")
const {
  getAllNotifications,
  getUnreadNotifications,
  newNotification,
  readNotification,
} = require("../controllers/notifications")

router.route('/all').get(protect, getAllNotifications);

router.route('/unread').get(protect, getUnreadNotifications);

router.route('/new').post(protect, newNotification);

router.route('read/:id').patch(protect, readNotification);
