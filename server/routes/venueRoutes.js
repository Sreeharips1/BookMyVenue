const express = require("express");

const {
  createVenue,
  getVenues,
  getVenueById,
  updateVenue,
  deleteVenue,
} = require("../controllers/venueController");

const { protect, ownerOnly } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getVenues);

router.get("/:id", getVenueById);

router.post("/", protect, ownerOnly, createVenue);

router.put("/:id", protect, ownerOnly, updateVenue);

router.delete("/:id", protect, ownerOnly, deleteVenue);

module.exports = router;
