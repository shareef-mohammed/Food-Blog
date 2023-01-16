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

router.post("/user/register", register);
router.post("/user/otpVerify", otpVerify);
router.post("/user/resendOtp", resendOtp);
router.put("/user/followUser/:id", followUser);
router.put("/user/addProfilePic", addProfilePic);
router.put("/user/updateProfile/:id", updateProfile);
router.get("/user/details", userDetails);
router.post("/user/forgotPassword", forgotPassword);
router.post("/user/resetPassword", resetPassword);
router.post("/user/resetEmail", resetEmail);
router.put("/user/uploadPhoto/:id", uploadPhoto);
router.put("/user/updateBio/:id", updateBio);
router.put("/user/deletePhoto/:id", deletePhoto);
router.get("/user/followersDetails/:id", followersDetails);
router.get("/user/followers", followers);
router.get("/user/isLocated", isLocated);
router.put("/user/setLocality", setLocality);

module.exports = router;
