import { useState } from "react";
import AuthLayout from "../../layouts/AuthLayout";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../../features/auth/authSlice";

import { loginUserApi } from "../../features/auth/authApi";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(loginStart());

      const data = await loginUserApi({
        email: formData.email,
        password: formData.password,
      });

      dispatch(loginSuccess(data));

      navigate("/owner/dashboard");
    } catch (error) {
      dispatch(loginFailure(error.response?.data?.message || "Login failed"));
    }
  };

  return (
    <AuthLayout title="Owner Login" subtitle="Manage your venues and bookings">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full bg-[#09122C] border border-slate-700 rounded-xl p-3 text-white"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full bg-[#09122C] border border-slate-700 rounded-xl p-3 text-white"
        />

        <button
          type="submit"
          className="w-full bg-[#CE2626] py-3 rounded-xl text-white font-semibold"
        >
          Login
        </button>
      </form>
    </AuthLayout>
  );
};

export default Login;
