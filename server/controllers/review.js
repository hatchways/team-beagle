const Review = require("../models/Review");
const asyncHandler = require("express-async-handler");
const decodeToken = require("../utils/decodeToken");

// @route POST /review/new-review/:sitterId
// @desc add review
// @access Public
exports.newReview = asyncHandler(async (req, res, next) => {
  const { rating, title, body } = req.body;
  const sitterId = req.params.sitterId;

  let decoded = decodeToken(req.cookies.token);
  const reviewerId = decoded.id;

  const review = await Review.create({
    reviewerId,
    sitterId,
    rating,
    title,
    body,
  });

  const sitterProfile = await Profile.findOne({ userId: sitterId });
  const reviewerProfile = await Profile.findOne({ userId: reviewerId });

  const numberOfReviews = sitterProfile.numberOfReviews || 0;
  let newRating;
  if (numberOfReviews == 0) newRating = rating;
  else {
    newRating =
      (sitterProfile.rating * numberOfReviews + rating) / (numberOfReviews + 1);
  }
  const update = {
    rating: newRating,
    numberOfReviews: numberOfReviews + 1,
  };

  const updatedSitterProfile = await Profile.findOneAndUpdate(
    { userId: sitterId },
    update,
    { new: true }
  );

  if (review && sitterProfile && updatedSitterProfile) {
    res.status(201).json({
      reviews: {
        reviewerId: reviewerId,
        sitterId: review.sitterId,
        rating: review.rating,
        title: review.title,
        body: review.body,
        profile: reviewerProfile,
        _id: review._id,
      },
    });
  } else {
    res.status(400);
    throw new Error("Invalid request data");
  }
});

// @route get /review/:sitterId
// @desc all reviews for sitter
// @access Private
exports.reviewsforSitter = asyncHandler(async (req, res, next) => {
  const sitterId = req.params.sitterId;

  let reviews;

  if (sitterId) {
    reviews = await Review.find(
      {
        sitterId: sitterId,
      },
      null,
      { sort: { createdAt: -1 } }
    );
  }
  if (!reviews) {
    res.status(404);
    throw new Error("No reviews for sitter");
  }
  let reviewsProfile = await Promise.all(
    reviews.map(async (review) => {
      let profile = await Profile.findOne({ userId: review.reviewerId });
      return {
        reviewerId: review.reviewerId,
        sitterId: review.sitterId,
        rating: review.rating,
        title: review.title,
        body: review.body,
        profile: profile,
        _id: review._id,
      };
    })
  );
  res.status(200).json({ reviews: reviewsProfile });
});

// @route Delete /review/delete/:reviewId
// @desc deletes review using reviewId
// @access Private
exports.deleteReview = asyncHandler(async (req, res, next) => {
  const reviewerId = req.user.id;
  const reviewId = req.params.reviewId;
  let deletedReview, review, sitterProfile, updatedSitterProfile;

  if (reviewId) {
    review = await Review.findById(reviewId);
  }
  if (review) {
    sitterProfile = await Profile.findOne({ userId: review.sitterId });
    if (sitterProfile) {
      const update = {
        rating:
          (sitterProfile.rating * sitterProfile.numberOfReviews -
            review.rating) /
          (sitterProfile.numberOfReviews - 1),
        numberOfReviews: sitterProfile.numberOfReviews - 1,
      };
      updatedSitterProfile = await Profile.findOneAndUpdate(
        { userId: review.sitterId },
        update,
        { new: true }
      );
    }
    deletedReview = await Review.findOneAndDelete({
      _id: reviewId,
      reviewerId: reviewerId,
    });
  }

  if (deletedReview && review && sitterProfile && updatedSitterProfile) {
    res.status(200).json({ reviews: deletedReview });
  } else {
    res.status(404);
    throw new Error("Review not found");
  }
});

// @route PATCH /review/edit-review/:reviewId
// @desc edit review
// @access Private
exports.editReview = asyncHandler(async (req, res, next) => {
  const reviewerId = req.user.id;
  const reviewId = req.params.reviewId;
  const { rating, title, body } = req.body;

  let updatedReview, review, sitterProfile, updatedSitterProfile;

  if (reviewId) {
    review = await Review.findById(reviewId);
  }
  if (review) {
    sitterProfile = await Profile.findOne({ userId: review.sitterId });
    if (sitterProfile) {
      const update = {
        rating:
          (sitterProfile.rating * sitterProfile.numberOfReviews -
            review.rating +
            rating) /
          sitterProfile.numberOfReviews,
        numberOfReviews: sitterProfile.numberOfReviews,
      };
      updatedSitterProfile = await Profile.findOneAndUpdate(
        { userId: review.sitterId },
        update,
        { new: true }
      );
    }
    const newReview = { rating, title, body };
    updatedReview = await Review.findOneAndUpdate(
      { _id: reviewId, reviewerId: reviewerId },
      newReview,
      {
        new: true,
      }
    );
  }

  if (updatedReview && review && sitterProfile && updatedSitterProfile) {
    res.status(200).json({ reviews: updatedReview });
  } else {
    res.status(404);
    throw new Error("Review not found");
  }
});
