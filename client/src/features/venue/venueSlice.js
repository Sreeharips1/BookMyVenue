import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  venues: [],
  loading: false,
  error: null,
  page: 1,
  totalPages: 1,
};

const venueSlice = createSlice({
  name: "venue",

  initialState,

  reducers: {
    setVenues: (state, action) => {
      state.venues = action.payload;
    },

    setVenueLoading: (state, action) => {
      state.loading = action.payload;
    },

    setVenueError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setVenues, setVenueLoading, setVenueError } = venueSlice.actions;

export default venueSlice.reducer;
