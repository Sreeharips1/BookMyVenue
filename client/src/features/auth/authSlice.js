import { createSlice } from "@reduxjs/toolkit";

const userFromStorage = localStorage.getItem("user");

const initialState = {
  user:
    userFromStorage && userFromStorage !== "undefined"
      ? JSON.parse(userFromStorage)
      : null,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    loginSuccess: (state, action) => {
      state.loading = false;

      const user = action.payload.user || action.payload.data;
      state.user = user;
      state.token = action.payload.token;

      localStorage.setItem("token", action.payload.token);

      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },

    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    logout: (state) => {
      state.user = null;
      state.token = null;

      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } =
  authSlice.actions;

export default authSlice.reducer;
