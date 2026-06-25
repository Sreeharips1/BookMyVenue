import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookings: [],
  loading: false,
  error: null,
};

const bookingSlice = createSlice({
  name: "booking",

  initialState,

  reducers: {
    setBookings: (state, action) => {
      state.bookings = action.payload;
    },

    setBookingLoading: (state, action) => {
      state.loading = action.payload;
    },

    setBookingError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setBookings, setBookingLoading, setBookingError } =
  bookingSlice.actions;

export default bookingSlice.reducer;
