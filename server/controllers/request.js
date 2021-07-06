const Request = require("../models/Request");
const asyncHandler = require("express-async-handler");
const decodeToken = require("../utils/decodeToken");

// @route POST /request/new-request
// @desc add request
// @access Public
exports.newRequest = asyncHandler(async (req, res, next) => {
  const { sitterId, startDate, endDate } = req.body;

  if (startDate > endDate) {
    res.status(400);
    throw new Error("End Date must be after than Start Date");
  }

  let decoded = decodeToken(req.cookies.token);
  const userId = decoded.id;

  const request = await Request.create({
    userId,
    sitterId,
    startDate,
    endDate,
  });

  if (request) {
    res.status(201).json({
      success: {
        request: {
          userId: userId,
          sitterId: request.sitterId,
          startDate: request.startDate,
          endDate: request.endDate,
          accept: request.accept,
          decline: request.decline,
          paid: request.paid,
        },
      },
    });
  } else {
    res.status(400);
    throw new Error("Invalid request data");
  }
});

// //@route Patch /request/edit-profile/:id
// //update request sitter accept/decline/paid
exports.editRequest = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const update = req.body;
  const requestId = req.params.id;
  try {
    const updatedRequest = await Request.findOneAndUpdate(
      { _id: requestId, sitterId: userId },
      update,
      { new: true }
    );
    if (updatedRequest) {
      res.status(200).json({ request: updatedRequest });
    } else {
      res.status(404).json({ message: "Request not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Could not update request" });
    throw new Error("Could not update request");
  }
});

// @route get /request/bookings/sitter
// @desc all requests made for current user
// @access Private
exports.requestsforCurrentUserSitter = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;

  let requests;

  if (userId) {
    requests = await Request.find({
      sitterId: userId,
    });
  }

  if (!requests) {
    res.status(404);
    throw new Error("No requests for sitter");
  }
  let requestsProfile = await Promise.all(
    requests.map(async (request) => {
      let profile = await Profile.findOne({ userId: request.userId });
      return {
        userId: userId,
        sitterId: request.sitterId,
        startDate: request.startDate,
        endDate: request.endDate,
        accept: request.accept,
        decline: request.decline,
        paid: request.paid,
        profile: profile,
        _id: request._id,
      };
    })
  );

  res.status(200).json({ requests: requestsProfile });
});

// @route get /request/bookings/owner
// @desc all requests made for current user
// @access Private
exports.requestsforCurrentUserOwner = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  let requests;

  if (userId) {
    requests = await Request.find({
      userId: userId,
    });
  }

  if (!requests) {
    res.status(404);
    throw new Error("No requests for sitter");
  }
  let requestsProfile = await Promise.all(
    requests.map(async (request) => {
      let profile = await Profile.findOne({ userId: request.sitterId });
      return {
        userId: userId,
        sitterId: request.sitterId,
        startDate: request.startDate,
        endDate: request.endDate,
        accept: request.accept,
        decline: request.decline,
        paid: request.paid,
        profile: profile,
        _id: request._id,
      };
    })
  );

  res.status(200).json({ requests: requestsProfile });
});

// @route Delete /request/delete/:id
// @desc deletes request using id
// @access Private
exports.requestsDelete = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const requestId = req.params.id;
  let requests;

  if (requestId) {
    requests = await Request.findOneAndDelete({
      _id: requestId,
      userId: userId,
    });
  }

  if (!requests) {
    res.status(404);
    throw new Error("No requests for sitter");
  }

  res.status(200).json({ requests: requests });
});
