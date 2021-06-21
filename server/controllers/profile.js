const mongoose = require("mongoose");

const Profile = require("../models/Profile");

const asyncHandler = require("express-async-handler");

// @route POST /profile
// Create New User Profile
exports.newUser = asyncHandler(async (req, res) => {
  const {
    userId,
    firstName,
    lastName,
    description,
    location,
    images,
    isDogSitter,
    rating,
    hourlyRate,
    tagLine,
  } = req.body;

  const profile = await Profile.create({
    userId,
    firstName,
    lastName,
    description,
    location,
    images,
    isDogSitter,
    rating,
    hourlyRate,
    tagLine,
  });

  if (profile) {
    res.status(201).json({
      userId: profile.userId,
      firstName: profile.FirstName,
      lastName: profile.lastName,
      description: profile.description,
      location: profile.location,
      images: profile.images,
      isDogSitter: profile.isDogSitter,
      rating: profile.rating,
      hourlyRate: profile.hourlyRate,
      tagLine: profile.tagLine,
    });
  } else {
    res.status(400).json({ message: "Invalid User Data" });
  }
});

// //@route Patch /profile
// //update profiles
exports.editProfile = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const update = req.body;

  try {
    const updateProfile = await Profile.findOneAndUpdate(
      { userId: userId },
      update,
      { new: true }
    );
    if (updateProfile) {
      res.status(200).json({ profile: updateProfile });
    } else {
      res.status(404).json({ message: "Profile not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Could not update profile" });
  }
});

//@route GET /profile
//Find Specific Profile
exports.getProfile = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  let profile;
  try {
    const getProfile = await Profile.findOne({ userId: userId });

    if (getProfile) {
      res.status(200).json({ profile: getProfile });
    } else {
      res.status(404).json({ message: "Profile Not Found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

//@route GET /profile/sitters
//fetch list of isDogSitter profiles
exports.findSitters = asyncHandler(async (req, res) => {
  let profiles;
  try {
    const profileList = await Profile.find({ isDogSitter: true });

    if (profileList) {
      res.status(200).json({ profiles: profileList });
    } else {
      res.status(404).json({ message: "Profiles Not Found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});
