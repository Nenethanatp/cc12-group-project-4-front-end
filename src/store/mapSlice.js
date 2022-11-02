import { createSlice } from "@reduxjs/toolkit";

const mapSlice = createSlice({
  name: "map",
  initialState: {
    marker: null,
    location: null,
    postLocationIds: [],
  },
  reducers: {
    setMarker: (state, action) => {
      state.marker = action.payload;
    },
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    setPostLocationIds: (state, action) => {
      state.postLocationIds = action.payload;
    },
    clearPostLocationIds: (state, action) => {
      state.postLocationIds = [];
    },
  },
});

export default mapSlice.reducer;

export const {
  setMarker,
  setLocation,
  setPostLocationIds,
  clearPostLocationIds,
} = mapSlice.actions;
