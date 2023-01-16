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
} = require("../controllers/adminController");

const auth = require("../middleware/auth");

router.post("/adminLogin", adminLogin);
router.get("/userDetails", userDetails);
router.put("/blockUser/:id", blockUser);
router.put("/unblockUser/:id", unblockUser);
router.get("/banners", banners);
router.post("/addBanner", addBanner);
router.delete("/deleteBanner/:id", deleteBanner);
router.get("/getBanners", getBanners);
router.get("/getReports", getReports);
router.get("/postChartData", postChartData);
router.get("/userCounts", userCounts);

module.exports = router;
