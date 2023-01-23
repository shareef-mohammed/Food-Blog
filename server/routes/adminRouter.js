const express = require("express");

const router = express();
const {
  adminLogin,

  userDetails,
  blockUser,
  unblockUser,
  banners,
  addBanner,
  deleteBanner,
  getBanners,
  getReports,
  postChartData,
  userCounts,
  removeReport,
  adminDetails,
  locations,
  addLocation,
  removeLocation,
} = require("../controllers/adminController");

const auth = require("../middleware/auth");

router.post("/adminLogin", adminLogin);
router.get("/userDetails", auth.validateAdminToken, userDetails);
router.put("/blockUser/:id", auth.validateAdminToken, blockUser);
router.put("/unblockUser/:id", auth.validateAdminToken, unblockUser);
router.get("/banners", auth.validateAdminToken, banners);
router.post("/addBanner", auth.validateAdminToken, addBanner);
router.delete("/deleteBanner/:id", auth.validateAdminToken, deleteBanner);
router.get("/getBanners", getBanners);
router.get("/getReports", auth.validateAdminToken, getReports);
router.get("/postChartData", postChartData);
router.get("/userCounts", auth.validateAdminToken, userCounts);
router.delete("/removeReport/:id", auth.validateAdminToken, removeReport);
router.get('/details', auth.validateAdminToken, adminDetails);
router.get('/locations', auth.validateAdminToken, locations);
router.post('/addLocation', auth.validateAdminToken, addLocation);
router.delete('/removeLocation/:id', auth.validateAdminToken, removeLocation);

module.exports = router;
