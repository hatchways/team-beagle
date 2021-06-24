const mongoose = require("mongoose")
const decodeToken = require("../utils/decodeToken")
const jwt = require("jsonwebtoken")

const Profile = require("../models/Profile")

const asyncHandler = require("express-async-handler")

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
  } = req.body

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
  })

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
    })
  } else {
    res.status(400).json({ message: "Invalid User Data" })
  }
})

// //@route Patch /profile/edit-profile/:id
// //update profiles
exports.editProfile = asyncHandler(async (req, res) => {
  const update = req.body
  let decoded = decodeToken(req.cookies.token)
  const userId = decoded.id
  try {
    const updateProfile = await Profile.findOneAndUpdate(
      { userId: userId },
      update,
      { new: true }
    )
    if (updateProfile) {
      res.status(200).json({ profile: updateProfile })
    } else {
      res.status(404).json({ message: "Profile not found" })
    }
  } catch (error) {
    return res.status(500).json({ error: "Could not update profile" })
  }
})

//@route GET /profile/get-profile/:id
//Find Specific Profile
exports.getProfile = asyncHandler(async (req, res) => {
  const userId = req.params.id
  try {
    const getProfile = await Profile.findOne({ userId: userId })

    if (getProfile) {
      res.status(200).json({ profile: getProfile })
    } else {
      res.status(404).json({ message: "Profile Not Found" })
    }
  } catch (error) {
    return res.status(500).json({ message: error })
  }
})

//@route GET /profile/sitters
//fetch list of isDogSitter profiles
exports.findSitters = asyncHandler(async (req, res) => {
  try {
    const profileList = await Profile.find({ isDogSitter: true })
    if (profileList) {
      res.status(200).json({ profiles: profileList })
    } else {
      res.status(404).json({ message: "Profiles Not Found" })
    }
  } catch (error) {
    return res.status(500).json({ message: error })
  }
})

// @route POST /profile/uploadphoto/
// Upload photo
exports.uploadPhoto = asyncHandler(async (req, res) => {
  let decoded = decodeToken(req.cookies.token)
  const userId = decoded.id
  const profile = await Profile.findOne({ userId })
  try {
    if (profile) {
      profile.images.push(req.file.path)
      await profile.save()
      res.status(200).json({ profile })
    } else {
      res.status(404).json({ message: "Profile Not Found" })
    }
  } catch (error) {
    return res.status(500).json({ message: error })
  }
})

// @route PATCH /profile/change-main-photo
// Change main photo (largest photo in profile details)
exports.changeMainPhoto = asyncHandler(async (req, res) => {
  let decoded = decodeToken(req.cookies.token)
  const userId = decoded.id
  const index = req.params.id
  const profile = await Profile.findOne({ userId })
  console.log(index)
  try {
    if (profile) {
      const temp = profile.images[0]
      profile.images[0] = profile.images[index]
      profile.images[index] = temp
      await profile.save()
      console.log('profile updated...')
      res.status(200).json({ profile })
    } else {
      res.status(404).json({ message: "Profile Not Found" })
    }
  } catch (error) {
    return res.status(500).json({ message: error })
  }
})
