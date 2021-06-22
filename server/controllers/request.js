const Request = require("../models/Request");
const asyncHandler = require("express-async-handler");

// @route POST /request
// @desc add request
// @access Public
exports.newRequest = asyncHandler(async (req, res, next) => {
  const { userID, sitterID, startDate, endDate } = req.body;

  if (startDate > endDate) {
    res.status(400);
    throw new Error("End Date must be after than Start Date");
  }

  const request = await Request.create({
    userID,
    sitterID,
    startDate,
    endDate,
  });

  if (request) {
    res.status(201).json({
      success: {
        request: {
          userID: request.userID,
          sitterID: request.sitterID,
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

// @route get /request/user/:id
// @desc all requests made by user
// @access Private
exports.requestsByUser = asyncHandler(async (req, res, next) => {
  const idString = req.params.id;

  let requests;
  if (idString) {
    requests = await Request.find({
      userID: idString,
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
      sitterID: idString,
    });
  }

  if (!requests) {
    res.status(404);
    throw new Error("No requests for sitter");
  }

  res.status(200).json({ requests: requests });
});
