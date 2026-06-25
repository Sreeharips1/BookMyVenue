const Venue = require("../models/Venue");
const Booking = require("../models/Booking");

const createVenue = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("USER:", req.user);
    const venue = await Venue.create({
      ...req.body,
      owner: req.user._id,
    });

    res.status(201).json(venue);
  } catch (error) {
    console.log(error.message);
    console.log(error.errors);
    res.status(500).json({
      message: error.message,
    });
  }
};

const getVenues = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 9;

    const skip = (page - 1) * limit;

    const totalVenues = await Venue.countDocuments();

    const venues = await Venue.find()
      .populate("owner", "name email")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.status(200).json({
      venues,
      currentPage: page,
      totalPages: Math.ceil(totalVenues / limit),
      totalVenues,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getVenueById = async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.id).populate(
      "owner",
      "name email",
    );

    if (!venue) {
      return res.status(404).json({
        message: "Venue not found",
      });
    }

    res.status(200).json(venue);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateVenue = async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.id);

    if (!venue) {
      return res.status(404).json({
        message: "Venue not found",
      });
    }

    if (venue.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    const updatedVenue = await Venue.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );

    res.status(200).json(updatedVenue);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getMyVenues = async (req, res) => {
  try {
    const venues = await Venue.find({
      owner: req.user._id,
    });

    res.status(200).json(venues);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteVenue = async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.id);

    if (!venue) {
      return res.status(404).json({
        message: "Venue not found",
      });
    }

    if (venue.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    await venue.deleteOne();

    res.status(200).json({
      message: "Venue deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getBookedSlots = async (req, res) => {
  try {
    const { date } = req.query;

    const venue = await Venue.findById(req.params.id);

    if (!venue) {
      return res.status(404).json({
        message: "Venue not found",
      });
    }

    const bookings = await Booking.find({
      venue: req.params.id,
      date,
    });

    const slots = venue.availableSlots.map((slot) => {
      const isBooked = bookings.some(
        (booking) =>
          booking.startTime === slot.startTime &&
          booking.endTime === slot.endTime,
      );

      return {
        startTime: slot.startTime,
        endTime: slot.endTime,
        isBooked,
      };
    });

    res.status(200).json({
      slots,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createVenue,
  getVenues,
  getVenueById,
  updateVenue,
  deleteVenue,
  getBookedSlots,
  getMyVenues,
};
