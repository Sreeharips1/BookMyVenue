const Venue = require("../models/Venue");

const createVenue = async (req, res) => {
  try {
    const venue = await Venue.create({
      ...req.body,
      owner: req.user._id,
    });

    res.status(201).json(venue);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getVenues = async (req, res) => {
  try {
    const venues = await Venue.find().populate("owner", "name email");

    res.status(200).json(venues);
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

module.exports = {
  createVenue,
  getVenues,
  getVenueById,
  updateVenue,
  deleteVenue,
};
