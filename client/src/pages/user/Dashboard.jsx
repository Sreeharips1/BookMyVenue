import { useEffect, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";

import StatCard from "../../components/StatCard";

import { getUserDashboardApi } from "../../features/dashboard/dashboardApi";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const Dashboard = () => {
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await getUserDashboardApi();

        setDashboard(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDashboard();
  }, []);

  if (!dashboard) {
    return (
      <DashboardLayout role="user" title="Dashboard" subtitle="Loading..." />
    );
  }

  return (
    <DashboardLayout role="user" title="Dashboard" subtitle="Welcome Back">
      <div className="space-y-8">
        <div className="grid md:grid-cols-2 xl:grid-cols-5 gap-4">
          <StatCard title="Bookings" value={dashboard.totalBookings} />

          <StatCard title="Total Spent" value={`₹${dashboard.totalSpent}`} />

          <StatCard
            title="Average"
            value={`₹${dashboard.averageBookingValue}`}
          />

          <StatCard title="Upcoming" value={dashboard.upcomingBookings} />

          <StatCard
            title="Favorite Venue"
            value={dashboard.favoriteVenue || "N/A"}
          />
        </div>
        <div className="bg-[#13203D] rounded-2xl p-6 border border-slate-800">
          <h2 className="text-white text-xl font-semibold mb-5">
            Monthly Spending
          </h2>

          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={dashboard.spendingGrowth}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />

              <XAxis dataKey="month" stroke="#94A3B8" />

              <YAxis stroke="#94A3B8" />

              <Tooltip />

              <Area
                type="monotone"
                dataKey="amount"
                stroke="#CE2626"
                fill="#CE2626"
                fillOpacity={0.2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-[#13203D] rounded-2xl p-6 border border-slate-800">
            <h2 className="text-xl font-semibold text-white mb-5">
              Recent Bookings
            </h2>

            <div className="space-y-4">
              {dashboard.recentBookings.map((booking) => (
                <div
                  key={booking._id}
                  className="border-b border-slate-700 pb-3"
                >
                  <p className="text-white font-medium">
                    {booking.venue?.title}
                  </p>

                  <p className="text-slate-400 text-sm">{booking.date}</p>

                  <p className="text-[#CE2626] mt-1">₹{booking.venue?.price}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-[#13203D] rounded-2xl p-6 border border-slate-800">
          <h2 className="text-xl font-semibold text-white mb-5">
            Upcoming Bookings
          </h2>

          <div className="space-y-4">
            {dashboard.upcomingBookingList.map((booking) => (
              <div key={booking._id} className="border-b border-slate-700 pb-3">
                <p className="text-white font-medium">{booking.venue?.title}</p>

                <p className="text-slate-400 text-sm">{booking.date}</p>

                <p className="text-[#22C55E]">Upcoming</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
