const express = require("express");

const router = express();

const {
  homePage,
  register,
  otpVerifyPage,
  otpVerify,
  resendOtp,
  resetEmail,
  addProfilePic,
  updateProfile,
  userDetails,
  forgotPassword,
  uploadPhoto,
  resetPassword,
  updateBio,
  deletePhoto,
  followUser,
  followersDetails,
  followers,
  isLocated,
  setLocality,
} = require("../controllers/userController");

router.get("/", homePage);

const auth = require('../middleware/auth')

router.post("/user/register", register);
router.post("/user/otpVerify", otpVerify);
router.post("/user/resendOtp", resendOtp);
router.put("/user/followUser/:id", followUser);
router.put("/user/addProfilePic", addProfilePic);
router.put("/user/updateProfile/:id", auth.validateUserToken, updateProfile);
router.get("/user/details", auth.validateUserToken, userDetails);
router.post("/user/forgotPassword", forgotPassword);
router.post("/user/resetPassword", resetPassword);
router.post("/user/resetEmail", auth.validateUserToken, resetEmail);
router.put("/user/uploadPhoto/:id", auth.validateUserToken, uploadPhoto);
router.put("/user/updateBio/:id", auth.validateUserToken, updateBio);
router.put("/user/deletePhoto/:id", auth.validateUserToken, deletePhoto);
router.get("/user/followersDetails/:id", followersDetails);
router.get("/user/followers/:id", auth.validateUserToken, followers);
router.get("/user/isLocated", isLocated);
router.put("/user/setLocality", auth.validateUserToken, setLocality);

module.exports = router;
