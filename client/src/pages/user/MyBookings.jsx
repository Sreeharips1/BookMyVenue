import DashboardLayout from "../../layouts/DashboardLayout";

import { getMyBookings } from "../../features/booking/bookingApi";
import { useEffect, useState } from "react";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getMyBookings();
        setBookings(data);
        console.log(bookings);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBookings();
  }, []);
  return (
    <DashboardLayout
      role="user"
      title="My Bookings"
      subtitle="View all your reservations"
    >
      <div className="grid gap-5">
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="bg-[#13203D] border border-slate-800 rounded-2xl p-5"
          >
            <h3 className="text-xl font-semibold text-white">
              {booking.venue?.title}
            </h3>

            <p className="text-slate-400 mt-2">Date: {booking.date}</p>

            <p className="text-slate-400">
              Slot: {booking.startTime}-{booking.endTime}
            </p>

            <p className="text-slate-400">
              Location: {booking.venue?.location}
            </p>

            <p className="text-[#CE2626] font-bold mt-3">
              ₹{booking.venue?.price}
            </p>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default MyBookings;
