const express = require("express")
const router = express.Router()
const protect = require("../middleware/auth")
const {
  newUser,
  editProfile,
  getProfile,
  findProfiles,
} = require("../controllers/profile")

router.route('/newuser').post(protect, newUser)

router.route('/editprofile').patch(protect, editProfile)

router.route('/getprofile').get(protect, getProfile)

router.route('/findprofiles').get(protect ,findProfiles)


module.exports = router
