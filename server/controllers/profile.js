const mongoose = require('mongoose');

const Profile = require('../models/Profile');

const asyncHandler = require("express-async-handler");

// @route POST 
// Create New User Profile
exports.newUser = asyncHandler(async (req, res) => {
    const { userId, firstName, lastName, description, location, isDogOwner, isDogSitter, rating, hourlyRate, tagLine } = req.body;
    
    const profile = await Profile.create({
        userId,
        firstName,
        lastName,
        description,
        location,
        isDogOwner,
        isDogSitter,
        rating,
        hourlyRate,
        tagLine
    });

    if (profile) {
         res.status(201).json({
            userId: profile.userId,
            firstName: profile.FirstName,
            lastName: profile.lastName,
            description: profile.description,
            location: profile.location,
            isDogSitter: profile.isDogSitter,
            rating: profile.rating,
            hourlyRate: profile.hourlyRate,
            tagLine: profile.tagLine,
        })
    } else {
       res.status(400).json({ message: "Invalid User Data"})
    }
});

// //@route UPDATE
// //update profiles 
exports.editProfile = asyncHandler(async (req, res) => {
    const userId = req.params.id
    let profile;
    try {
        const updateProfile = await Profile.findOneAndUpdate({userId: userId});
            if(updateProfile) { 
                profile.save(res.status(200).json({profile: updateProfile})
            )} else {
                res.status(404).json({ message: "Profile not found"})
            }
        } catch (error) {
            return res.status(500).json({error: "Could not update profile"})
        };
});

//@route GET
//Find Specific Profile
exports.getProfile = asyncHandler(async(req, res) => {
    const userId = req.params.id 
    let profile;
    try {
        const getProfile = await Profile.findOne({id: userId})
        
        if(getProfile) {
        res.status(200).json({profile: getProfile});
        } else {
        res.status(404).json({message: "Profile Not Found"});
        }

    } catch(error) {
        return res.status(500).json({message: error})
    }
});



//@route GET 
//fetch list of profiles
exports.findProfiles = asyncHandler(async (req, res) => {
    const search = req.query.search;
    let profiles;
    try {
        // should search for isDogSitter: true
        const profileList = await Profile.find({req: search})
        
        if(profileList) {
        res.status(200).json({profiles: profileList});
        } else {
        res.status(404).json({message: "Profiles Not Found"});
        }
    } catch (error) {
        return res.status(500).json({message: error})
    }
    
});
