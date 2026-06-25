import { useEffect, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";

import {
  getProfileApi,
  updateProfileApi,
  changePasswordApi,
} from "../../features/auth/authApi";

import { useSelector } from "react-redux";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfileApi();

        setProfile({
          name: data.name || "",
          email: data.email || "",
          mobile: data.mobile || "",
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, []);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();

    try {
      await updateProfileApi(profile);

      alert("Profile updated successfully");
    } catch (error) {
      console.error(error);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    try {
      await changePasswordApi(passwordData);

      alert("Password changed successfully");

      setPasswordData({
        currentPassword: "",
        newPassword: "",
      });
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Failed to change password");
    }
  };

  return (
    <DashboardLayout
      role={user.role}
      title="Profile"
      subtitle="Manage your account"
    >
      <div className="space-y-8">
        {/* Profile Card */}

        <div className="bg-[#13203D] p-6 rounded-2xl border border-slate-800">
          <h2 className="text-xl font-bold text-white mb-6">
            Personal Information
          </h2>

          <form onSubmit={handleProfileUpdate} className="space-y-4">
            <input
              type="text"
              value={profile.name}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  name: e.target.value,
                })
              }
              placeholder="Name"
              className="w-full bg-[#09122C] border border-slate-700 rounded-xl p-3 text-white"
            />

            <input
              type="email"
              value={profile.email}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  email: e.target.value,
                })
              }
              placeholder="Email"
              className="w-full bg-[#09122C] border border-slate-700 rounded-xl p-3 text-white"
            />

            <input
              type="text"
              value={profile.mobile}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  mobile: e.target.value,
                })
              }
              placeholder="Mobile Number"
              className="w-full bg-[#09122C] border border-slate-700 rounded-xl p-3 text-white"
            />

            <button
              type="submit"
              className="bg-[#CE2626] px-6 py-3 rounded-xl text-white"
            >
              Update Profile
            </button>
          </form>
        </div>

        {/* Password */}

        <div className="bg-[#13203D] p-6 rounded-2xl border border-slate-800">
          <h2 className="text-xl font-bold text-white mb-6">Change Password</h2>

          <form onSubmit={handlePasswordChange} className="space-y-4">
            <input
              type="password"
              placeholder="Current Password"
              value={passwordData.currentPassword}
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  currentPassword: e.target.value,
                })
              }
              className="w-full bg-[#09122C] border border-slate-700 rounded-xl p-3 text-white"
            />

            <input
              type="password"
              placeholder="New Password"
              value={passwordData.newPassword}
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  newPassword: e.target.value,
                })
              }
              className="w-full bg-[#09122C] border border-slate-700 rounded-xl p-3 text-white"
            />

            <button
              type="submit"
              className="bg-[#CE2626] px-6 py-3 rounded-xl text-white"
            >
              Change Password
            </button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
