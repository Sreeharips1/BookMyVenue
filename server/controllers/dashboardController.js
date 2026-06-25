const Booking = require("../models/Booking");
const Venue = require("../models/Venue");
const User = require("../models/User");

const getUserDashboard = async (req, res) => {
  try {
    const bookings = await Booking.find({
      user: req.user._id,
    })
      .populate("venue")
      .sort({ createdAt: -1 });

    const totalBookings = bookings.length;

    const totalSpent = bookings.reduce(
      (sum, booking) => sum + (booking.venue?.price || 0),
      0,
    );

    const recentBooking = bookings.length > 0 ? bookings[0] : null;
    const recentBookings = bookings.slice(0, 5);

    const upcomingBookings = bookings.filter(
      (booking) => new Date(booking.date) >= new Date(),
    ).length;

    const venueCount = {};

    bookings.forEach((booking) => {
      const venueTitle = booking.venue?.title;

      if (venueTitle) {
        venueCount[venueTitle] = (venueCount[venueTitle] || 0) + 1;
      }
    });

    let favoriteVenue = null;

    let maxCount = 0;

    Object.entries(venueCount).forEach(([venue, count]) => {
      if (count > maxCount) {
        maxCount = count;
        favoriteVenue = venue;
      }
    });

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const spendingGrowth = {};

    bookings.forEach((booking) => {
      const month = months[new Date(booking.createdAt).getMonth()];

      spendingGrowth[month] =
        (spendingGrowth[month] || 0) + (booking.venue?.price || 0);
    });

    const averageBookingValue =
      totalBookings > 0 ? Math.round(totalSpent / totalBookings) : 0;

    const upcomingBookingList = bookings
      .filter((booking) => new Date(booking.date) >= new Date())
      .slice(0, 5);

    res.status(200).json({
      totalBookings,
      totalSpent,
      upcomingBookings,
      favoriteVenue,
      recentBooking,
      recentBookings,
      averageBookingValue,
      upcomingBookingList,

      spendingGrowth: Object.entries(spendingGrowth).map(([month, amount]) => ({
        month,
        amount,
      })),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getOwnerDashboard = async (req, res) => {
  try {
    const venues = await Venue.find({
      owner: req.user._id,
    });

    const venueIds = venues.map((venue) => venue._id);

    const bookings = await Booking.find({
      venue: { $in: venueIds },
    })
      .populate("venue")
      .populate("user", "name email mobile")
      .sort({ createdAt: -1 });

    const totalVenues = venues.length;

    const totalBookings = bookings.length;

    const totalRevenue = bookings.reduce(
      (sum, booking) => sum + (booking.venue?.price || 0),
      0,
    );

    const recentBookings = bookings.slice(0, 5);

    res.status(200).json({
      totalVenues,
      totalBookings,
      totalRevenue,
      recentBookings,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getOwnerAnalytics = async (req, res) => {
  try {
    const venues = await Venue.find({
      owner: req.user._id,
    });

    const venueIds = venues.map((venue) => venue._id);

    const bookings = await Booking.find({
      venue: { $in: venueIds },
    })
      .populate("venue")
      .populate("user", "name email");

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const bookingGrowth = {};

    const revenueGrowth = {};

    bookings.forEach((booking) => {
      const month = months[new Date(booking.createdAt).getMonth()];

      bookingGrowth[month] = (bookingGrowth[month] || 0) + 1;

      revenueGrowth[month] =
        (revenueGrowth[month] || 0) + (booking.venue?.price || 0);
    });

    const venueStats = {};

    bookings.forEach((booking) => {
      const venueTitle = booking.venue?.title;

      if (!venueTitle) return;

      if (!venueStats[venueTitle]) {
        venueStats[venueTitle] = {
          bookings: 0,
          revenue: 0,
        };
      }

      venueStats[venueTitle].bookings += 1;
      venueStats[venueTitle].revenue += booking.venue.price;
    });

    const topVenues = Object.entries(venueStats)
      .map(([title, data]) => ({
        title,
        bookings: data.bookings,
        revenue: data.revenue,
      }))
      .sort((a, b) => b.bookings - a.bookings)
      .slice(0, 5);

    let totalSlots = 0;

    venues.forEach((venue) => {
      totalSlots += venue.availableSlots.length;
    });

    const occupancyRate =
      totalSlots === 0 ? 0 : Math.round((bookings.length / totalSlots) * 100);

    const today = new Date();

    const upcomingBookings = bookings
      .filter((booking) => new Date(booking.date) >= new Date())
      .slice(0, 5)
      .map((booking) => ({
        venue: booking.venue?.title,
        user: booking.user?.name,
        date: booking.date,
        startTime: booking.startTime,
        endTime: booking.endTime,
      }));

    const recentActivities = bookings.slice(0, 10).map((booking) => ({
      message: `${booking.user?.name} booked ${booking.venue?.title}`,
      date: booking.createdAt,
    }));

    const totalVenues = venues.length;

    const mostBookedVenue = topVenues.length > 0 ? topVenues[0] : null;

    const totalBookings = bookings.length;

    const totalRevenue = bookings.reduce(
      (sum, booking) => sum + (booking.venue?.price || 0),
      0,
    );

    const averageBookingValue =
      totalBookings > 0 ? Math.round(totalRevenue / totalBookings) : 0;

    const highestRevenueVenue =
      topVenues.length > 0
        ? [...topVenues].sort((a, b) => b.revenue - a.revenue)[0]
        : null;

    res.status(200).json({
      totalVenues,
      totalBookings,
      totalRevenue,
      averageBookingValue,
      highestRevenueVenue,

      mostBookedVenue,

      occupancyRate,

      topVenues,

      upcomingBookings,

      recentActivities,

      bookingGrowth: Object.entries(bookingGrowth).map(([month, count]) => ({
        month,
        count,
      })),

      revenueGrowth: Object.entries(revenueGrowth).map(([month, revenue]) => ({
        month,
        revenue,
      })),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { getUserDashboard, getOwnerDashboard, getOwnerAnalytics };
