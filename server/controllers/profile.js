const mongoose = require("mongoose");

const Profile = require("../models/Profile");

const asyncHandler = require("express-async-handler");

const { storage } = require("../cloudinary")
const upload = multer({ storage })


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
      firstName: profile.firstName,
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

// //@route Patch /profile/editprofile/:id
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

//@route GET /profile/getprofile/:id
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

// @route POST /profile/uploadphoto/:id
// Upload photo
exports.uploadphoto = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  try {
    
  } catch (error) {
    return res.status(500).json({ message: error });
  }
})



// //@route GET 
// //fetch list of profiles
// exports.findProfiles = asyncHandler(async (req, res) => {
//     const search = req.query.search;
//     let profiles;
//     try {
//         // should search for isDogSitter: true
//         const profileList = await Profile.find({req: search})


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
})
