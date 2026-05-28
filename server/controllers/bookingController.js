const Venue = require("../models/Venue");
const Booking = require("../models/Booking");

const createBooking = async (req, res) => {
  try {
    const { venue, date, startTime, endTime } = req.body;

    const venueExists = await Venue.findById(venue);

    if (!venueExists) {
      return res.status(404).json({
        message: "Venue not found",
      });
    }

    const validSlot = venueExists.availableSlots.some(
      (slot) => slot.startTime === startTime && slot.endTime === endTime,
    );

    if (!validSlot) {
      return res.satus(400).json({
        message: "Invalid slot selected",
      });
    }

    const existingBooking = await Booking.findOne({
      venue,
      date,
      startTime,
      endTime,
    });

    if (existingBooking) {
      return res.status(400).json({
        message: "Slot already booked",
      });
    }

    const booking = await Booking.create({
      user: req.user._id,
      venue,
      date,
      startTime,
      endTime,
    });

    res.status(201).json({
      message: "Booking confirmed",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate("venue")
      .populate("user", "name email");

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getOwnerBookings = async (req, res) => {
  try {
    const venues = await Venue.find({
      owner: req.user._id,
    });

    const venueIds = venues.map((venue) => venue._id);

    const bookings = await Booking.find({
      venue: { $in: venueIds },
    })
      .populate("user", "name email")
      .populate("venue", "title location");

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { createBooking, getMyBookings, getOwnerBookings };
