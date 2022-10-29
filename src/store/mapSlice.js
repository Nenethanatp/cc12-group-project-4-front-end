import { createSlice } from "@reduxjs/toolkit";

const mapSlice = createSlice({
  name: "map",
  initialState: {
    location: null,
    postLocationIds: [],
  },
  reducers: {
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

export const { setLocation, setPostLocationIds, clearPostLocationIds } =
  mapSlice.actions;