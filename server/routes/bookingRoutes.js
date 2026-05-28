const express = require("express");

const {
  createBooking,
  getMyBookings,
  getOwnerBookings,
} = require("../controllers/bookingController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createBooking);

router.get("/my", protect, getMyBookings);

router.get("/owner", protect, getOwnerBookings);

module.exports = router;
