const mongoose = require('mongoose');

const Profile = require('../models/Profile');

const asyncHandler = require("express-async-handler");

// @route POST 
// Create New User Profile
exports.newUser = asyncHandler(async (req, res) => {
    const { userCred, firstName, lastName, description, location, isDogOwner, isDogSitter, rating, hourlyRate, tagLine } = req.body;
    
    const profile = await Profile.create({
        userCred,
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
            userCred: profile.userCred,
            firstName: profile.FirstName,
            lastName: profile.lastName,
            description: profile.description,
            location: profile.location,
            isDogOwner: profile.isDogOwner,
            isDogSitter: profile.isDogSitter,
            raring: profile.rating,
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
    
    try {
        const updateProfile = await Profile.findOne({userId: userId}, function(profile, error) {
        if(error) { res.status(400).json({ message: "Invalid User Data"}) }
        else {
            for (const params of Object.params(req.body)) {
                profile[params] = req.body[params]
            }
            profile.save(res.status(200).json({profile: updateProfile}))
        }
    })
        } catch (error) {
            return status(500).json({error: message})
        }
});

//@route GET
//Find Specific Profile
exports.getProfile = asyncHandler(async(req, res) => {
    const userId = req.params.id 

    try {
        const getProfile = await Profile.findOne({ id: userId}, (profile, error) => {
            if(profile) {
                res.status(200).json({profile: getProfile});
            } else {
                res.status(404).json({message: error});
            }
        })
    } catch(error) {
        return res.status(500).json({message: error})
    }
});



//@route GET 
//fetch list of profiles
exports.findProfiles = asyncHandler(async (req, res) => {
    const search = req.query.search;

    try {
        const profileList = await Profile.find({req: search}, (profiles, error) => {
            if(profiles) {
                res.status(200).json({profiles: profileList});
            } else {
                res.status(404).json({message: error});
            }
        })
    } catch (error) {
        return res.status(500).json({message: error})
    }
    
});