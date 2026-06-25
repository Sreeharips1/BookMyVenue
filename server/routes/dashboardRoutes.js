const express = require("express");
const { protect } = require("../middleware/authMiddleware");

const {
  getUserDashboard,
  getOwnerDashboard,
  getOwnerAnalytics,
} = require("../controllers/dashboardController");

const router = express.Router();

router.get("/userdashboard", protect, getUserDashboard);

router.get("/ownerdashboard", protect, getOwnerDashboard);

router.get("/owner/analytics", protect, getOwnerAnalytics);

module.exports = router;
