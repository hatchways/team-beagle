const Request = require("../models/Request");
const asyncHandler = require("express-async-handler");
const decodeToken = require("../utils/decodeToken");
const { request } = require("express");

// @route POST /request
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
// //update request
exports.editRequest = asyncHandler(async (req, res) => {
  const update = req.body;
  const requestId = req.params.id;
  try {
    const updatedRequest = await Request.findOneAndUpdate(
      { _id: requestId },
      update,
      { new: true }
    );
    if (updatedRequest) {
      res.status(200).json({ request: updatedRequest });
    } else {
      res.status(404).json({ message: "Request not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Could not update request" });
  }
});
// @route get /request/user/:id
// @desc all requests made by user
// @access Private
exports.requestsByUser = asyncHandler(async (req, res, next) => {
  const idString = req.params.id;

  let requests;
  if (idString) {
    requests = await Request.find({
      userId: idString,
    });
  }

  if (!requests) {
    res.status(404);
    throw new Error("No requests made by user");
  }

  res.status(200).json({ requests: requests });
});

// @route get /request/sitter/:id
// @desc all requests made for sitter
// @access Private
exports.requestsforSitter = asyncHandler(async (req, res, next) => {
  const idString = req.params.id;

  let requests;
  if (idString) {
    requests = await Request.find({
      sitterId: idString,
    });
  }

  if (!requests) {
    res.status(404);
    throw new Error("No requests for sitter");
  }

  res.status(200).json({ requests: requests });
});

// @route get /request/bookings/sitter
// @desc all requests made for current user
// @access Private
exports.requestsforCurrentUserSitter = asyncHandler(async (req, res, next) => {
  let decoded = decodeToken(req.cookies.token);
  const userId = decoded.id;
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
  let decoded = decodeToken(req.cookies.token);
  const userId = decoded.id;
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
