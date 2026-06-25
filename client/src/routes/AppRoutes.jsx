import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";

import Discover from "../pages/user/Discover";
import UserDashboard from "../pages/user/Dashboard";
import MyBookings from "../pages/user/MyBookings";

import OwnerDashboard from "../pages/owner/Dashboard";
import MyVenues from "../pages/owner/MyVenues";
import AddEditVenue from "../pages/owner/AddEditVenue";
import Bookings from "../pages/owner/Bookings";

import VenueDetails from "../pages/VenueDetails";

import UserLogin from "../pages/user/Login";
import UserRegister from "../pages/user/Register";

import OwnerLogin from "../pages/owner/Login";
import OwnerRegister from "../pages/owner/Register";

import ProtectedRoute from "./ProtectedRoutes";

import UserProfile from "../pages/user/Profile";
import OwnerProfile from "../pages/owner/Profile";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* USER */}
        <Route
          path="/user/dashboard"
          element={
            <ProtectedRoute role="user">
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/Mybooking"
          element={
            <ProtectedRoute role="user">
              <MyBookings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user/profile"
          element={
            <ProtectedRoute role="user">
              <UserProfile />
            </ProtectedRoute>
          }
        />

        <Route path="/user/discover" element={<Discover />} />

        {/* OWNER */}
        <Route
          path="/owner/dashboard"
          element={
            <ProtectedRoute role="owner">
              <OwnerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/owner/profile"
          element={
            <ProtectedRoute role="owner">
              <OwnerProfile />
            </ProtectedRoute>
          }
        />

        <Route path="/owner/venues" element={<MyVenues />} />

        <Route path="/owner/add-venue" element={<AddEditVenue />} />

        <Route path="/owner/bookings" element={<Bookings />} />

        {/* COMMON */}
        <Route path="/venue/:id" element={<VenueDetails />} />

        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/user/register" element={<UserRegister />} />

        <Route path="/owner/login" element={<OwnerLogin />} />
        <Route path="/owner/register" element={<OwnerRegister />} />

        <Route
          path="/owner/edit-venue/:id"
          element={
            <ProtectedRoute>
              <AddEditVenue />
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
