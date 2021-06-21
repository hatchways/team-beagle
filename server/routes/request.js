const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {
  addRequest,
  requestsByUser,
  requestsforSitter,
} = require("../controllers/request");

router.route("/new").post(addRequest);
router.route("/user/:id").get(protect, requestsByUser);
router.route("/sitter/:id").get(protect, requestsforSitter);
module.exports = router;
