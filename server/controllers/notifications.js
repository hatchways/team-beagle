const mongoose = require("mongoose")
const asyncHandler = require("express-async-handler")
const decodeToken = require("../utils/decodeToken")
const jwt = require("jsonwebtoken")

const Notification = require("../models/Notifications")

// @route GET /notifications/all
// Get all notifications
exports.getAllNotifications = asyncHandler(async (req, res) => {
  let decoded = decodeToken(req.cookies.token)
  const userId = decoded.id
  try {
    const allNotifications = await Notification.find({ recipient: userId })
    if (allNotifications) {
      res.status(200).json({ notifications: allNotifications })
    } else {
      res.status(404).json({ message: "Notifications not found" })
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Could not get notifications for this user" })
  }
})

// @route GET /notifications/unread
// Get all unread notifications
exports.getUnreadNotifications = asyncHandler(async (req, res) => {
  let decoded = decodeToken(req.cookies.token)
  const userId = decoded.id
  try {
    const unreadNotifications = await Notification.find({
      $and: [{ recipient: userId }, { read: false }],
    })
    if (unreadNotifications) {
      res.status(200).json({ notifications: unreadNotifications })
    } else {
      res.status(404).json({ message: "Unread notifications not found" })
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Could not get read notifications for this user" })
  }
})

// @route POST /notifications/new
// Create new notification
exports.newNotification = asyncHandler(async (req, res) => {
  const { type, title, content, recipient } = req.body
  let decoded = decodeToken(req.cookies.token)
  const userId = decoded.id
  console.log("attempting to post a new notification...")
  try {
    const notification = await Notification.create({
      sender: type === "message" ? userId : "",
      recipient,
      type,
      title,
      read: false,
      content,
      date: Date.now(),
    })
    console.log("notification created")
    res.status(201).json({
      success: {
        notification: {
          id: notification._id,
          type: notification.type,
          content: notification.content,
        },
      },
    })
  } catch (error) {
    return res.status(500).json({ error: "Could not post notification" })
  }
})

// @route PATCH /notifications/read/:id
// Mark notification as read
exports.readNotification = asyncHandler(async (req, res) => {
  const notificationId = req.params.id
  try {
    await Notification.findOneAndUpdate({ _id: notificationId }, { read: true })
    res.status(201).json({
      success: {
        notification: {
          id: notificationId,
          read: true,
        },
      },
    })
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Could not mark notification as read" })
  }
})