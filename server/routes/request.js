const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {
  addRequest,
  requestsByUser,
  requestsforSitter,
} = require("../controllers/request");

router.route("/").post(addRequest);
router.route("/user").get(protect, requestsByUser);
router.route("/sitter").get(protect, requestsforSitter);
module.exports = router;
