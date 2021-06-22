const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {
  newRequest,
  requestsByUser,
  requestsforSitter,
} = require("../controllers/request");

router.route("/new-request").post(newRequest);
router.route("/user/:id").get(protect, requestsByUser);
router.route("/sitter/:id").get(protect, requestsforSitter);
module.exports = router;
