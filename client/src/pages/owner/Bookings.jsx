import DashboardLayout from "../../layouts/DashboardLayout";

import { getOwnerBookings } from "../../features/booking/bookingApi";
import { useEffect, useState } from "react";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchbooking = async () => {
      try {
        const response = await getOwnerBookings();
        setBookings(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchbooking();
  }, []);
  return (
    <DashboardLayout
      role="owner"
      title="Bookings"
      subtitle="Manage bookings for your venues"
    >
      <div className="bg-[#13203D] rounded-2xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#09122C]">
              <tr>
                <th className="text-left p-4 text-slate-300">Venue</th>

                <th className="text-left p-4 text-slate-300">User</th>

                <th className="text-left p-4 text-slate-300">Date</th>

                <th className="text-left p-4 text-slate-300">Slot</th>
                <th className="text-left p-4 text-slate-300">Status</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id} className="border-t border-slate-800">
                  <td className="p-4 text-white">
                    {booking.venue?.title}
                    <br />
                    <span className="text-xs text-slate-500">
                      {booking.venue?.location}
                    </span>
                  </td>

                  <td className="p-4 text-slate-300">
                    {booking.user?.name}
                    <br />
                    <span className="text-xs text-slate-500">
                      {booking.user?.email}
                    </span>
                  </td>

                  <td className="p-4 text-slate-300">{booking.date}</td>

                  <td className="p-4 text-slate-300">
                    {booking.startTime}-{booking.endTime}
                  </td>
                  <td className="p-4">
                    <span
                      className="
      bg-green-500/20
      text-green-400
      px-3 py-1
      rounded-full
      text-sm
    "
                    >
                      Confirmed
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Bookings;
