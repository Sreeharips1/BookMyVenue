import { useState } from "react";
import AuthLayout from "../../layouts/AuthLayout";

import { registerUserApi } from "../../features/auth/authApi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../../features/auth/authSlice";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await registerUserApi({
        ...formData,
        role: "user",
      });

      dispatch(loginSuccess(data));

      navigate("/user/dashboard");
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <AuthLayout title="User Register" subtitle="Create your booking account">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full bg-[#09122C] border border-slate-700 rounded-xl p-3 text-white"
        />

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
          Register
        </button>
      </form>
    </AuthLayout>
  );
};

export default Register;
