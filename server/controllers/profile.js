const mongoose = require("mongoose");
const decodeToken = require("../utils/decodeToken");
const jwt = require("jsonwebtoken");

const Profile = require("../models/Profile");

const asyncHandler = require("express-async-handler");

// @route POST /profile/new
// Create New User Profile
exports.newProfile = asyncHandler(async (req, res) => {
  const {
    userId,
    firstName,
    lastName,
    description,
    location,
    images,
    isDogSitter,
    availabilityWeek,
    availabilityDays,

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
    availabilityWeek,
    availabilityDays,
    rating,
    hourlyRate,
    tagLine,
  });

  if (profile) {
    res.status(201).json({
      userId: profile.userId,
      firstName: profile.firstName,
      lastName: profile.lastName,
      description: profile.description,
      location: profile.location,
      images: profile.images,
      isDogSitter: profile.isDogSitter,
      availabilityWeek: profile.availabilityWeek,
      availabilityDays: profile.availabilityDays,
      rating: profile.rating,
      hourlyRate: profile.hourlyRate,
      tagLine: profile.tagLine,
    });
  } else {
    res.status(400).json({ message: "Invalid User Data" });
  }
});

// //@route Patch /profile/edit-profile/:id
// //update profiles
exports.editProfile = asyncHandler(async (req, res) => {
  const update = req.body;
  let decoded = decodeToken(req.cookies.token);
  const userId = decoded.id;
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
    return res.status(500).json({ error: "Could not update profile" });
  }
});

//@route GET /profile/get-profile/:id
//Find Specific Profile
exports.getProfile = asyncHandler(async (req, res) => {
  const userId = req.params.id;
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

//@route Get /profile/location/:search
//return list of profiles who match users search 
exports.findSittersByLocation = asyncHandler(async (req, res) => {
  const search = req.params.search;
  
  try {
    
    const profileList = await Profile.find({ 
      location: { $regex: search, $options: "i" },
      isDogSitter: true });

      if(profileList) {
        return res.status(200).json({profiles: profileList})
      } else {
        return res.status(404).json({message: "No Profiles Found"})
        
      }
  } catch(error) {
    return res.status(500).json({message: error});
  }
});
