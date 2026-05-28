const mongoose = require("mongoose");

const venueSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      required: true,
    },
    bookingTypes: {
      type: String,
      enum: ["hourly", "half-day", "full-day"],
      default: "hourly",
    },

    availableSlots: [
      {
        startTime: String,
        endTime: String,
      },
    ],

    price: {
      type: Number,
      required: true,
    },

    capacity: {
      type: Number,
      required: true,
    },

    amenities: [
      {
        type: String,
      },
    ],

    image: {
      type: String,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Venue", venueSchema);
