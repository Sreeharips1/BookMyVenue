import { useEffect, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";

import { getOwnerAnalyticsApi } from "../../features/dashboard/dashboardApi";

import StatCard from "../../components/StatCard";

import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const Dashboard = () => {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getOwnerAnalyticsApi();
        console.log("OWNER ANALYTICS", data);

        setAnalytics(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  if (!analytics) {
    return (
      <DashboardLayout role="owner" title="Dashboard" subtitle="Loading..." />
    );
  }

  return (
    <DashboardLayout
      role="owner"
      title="Dashboard"
      subtitle="Business Overview"
    >
      <div className="space-y-8">
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
          <StatCard title="Venues" value={analytics.totalVenues} />

          <StatCard title="Bookings" value={analytics.totalBookings} />

          <StatCard title="Revenue" value={`₹${analytics.totalRevenue}`} />

          <StatCard
            title="Avg Booking"
            value={`₹${analytics.averageBookingValue}`}
          />

          <StatCard title="Occupancy" value={`${analytics.occupancyRate}%`} />

          <StatCard
            title="Top Venue"
            value={analytics.mostBookedVenue?.title || "N/A"}
          />

          <StatCard
            title="Highest Revenue"
            value={analytics.highestRevenueVenue?.title || "N/A"}
          />
        </div>
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-[#13203D] p-6 rounded-2xl border border-slate-800">
            <h2 className="text-xl font-semibold text-white mb-4">
              Revenue Growth
            </h2>

            <ResponsiveContainer width="100%" height={320}>
              <AreaChart data={analytics.revenueGrowth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />

                <XAxis dataKey="month" stroke="#94A3B8" />

                <YAxis stroke="#94A3B8" />

                <Tooltip />

                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#CE2626"
                  fill="#CE2626"
                  fillOpacity={0.2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-[#13203D] p-6 rounded-2xl border border-slate-800">
            <h2 className="text-xl font-semibold text-white mb-4">
              Monthly Bookings
            </h2>

            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={analytics.bookingGrowth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />

                <XAxis dataKey="month" stroke="#94A3B8" />

                <YAxis stroke="#94A3B8" />

                <Tooltip />

                <Bar dataKey="count" fill="#22C55E" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-[#13203D] p-6 rounded-2xl border border-slate-800">
            <h2 className="text-xl font-semibold text-white mb-4">
              Venue Revenue Leaderboard
            </h2>

            <ResponsiveContainer width="100%" height={350}>
              <BarChart layout="vertical" data={analytics.topVenues}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis type="number" stroke="#94A3B8" />

                <YAxis
                  type="category"
                  dataKey="title"
                  width={120}
                  stroke="#94A3B8"
                />

                <Tooltip />

                <Bar dataKey="revenue" fill="#CE2626" radius={[0, 10, 10, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-[#13203D] p-6 rounded-2xl">
            <h2 className="text-xl text-white mb-4">Top Venues</h2>

            <div className="space-y-3">
              {analytics.topVenues?.map((venue) => (
                <div
                  key={venue.title}
                  className="flex justify-between text-white"
                >
                  <span>{venue.title}</span>

                  <span>{venue.bookings} bookings</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-[#13203D] p-6 rounded-2xl">
            <h2 className="text-xl text-white mb-4">Upcoming Bookings</h2>

            <div className="space-y-3">
              {analytics.upcomingBookings?.map((booking, index) => (
                <div key={index} className="border-b border-slate-700 pb-2">
                  <p className="text-white">{booking.venue?.title}</p>

                  <p className="text-slate-400">{booking.user?.name}</p>

                  <p className="text-slate-500 text-sm">{booking.date}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-[#13203D] p-6 rounded-2xl">
            <h2 className="text-xl text-white mb-4">Recent Activity</h2>

            <div className="space-y-3">
              {analytics.recentActivities?.map((activity, index) => (
                <div key={index} className="text-slate-300">
                  {activity.message}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
