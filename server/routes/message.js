const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });

const {
  newConversation,
  newMessage,
  getConversations,
  deleteConversation,
  readMessages,
  getConversation,
  pinConversation,
  newImage,
} = require("../controllers/message");

router.route("/conversation/create/:id").post(protect, newConversation);

router.route("/:id").post(protect, newMessage);

router.route("/image/:id").patch(upload.single("file"), newImage);

router.route("/conversation/all").get(protect, getConversations);

router.route("/conversation/delete/:id").delete(protect, deleteConversation);

router.route("/messages/read/:id").patch(protect, readMessages);

router.route("/conversation/show/:id").get(protect, getConversation);

router.route("/conversation/pin/:id").patch(protect, pinConversation);

module.exports = router;
