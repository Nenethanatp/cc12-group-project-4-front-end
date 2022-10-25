import { createSlice } from "@reduxjs/toolkit";

const mapSlice = createSlice({
  name: "types",
  initialState: {
    location: null,
  },
  reducers: {
    setLocation: (state, action) => {
      state.location = action.payload;
    },
  },
});

export default mapSlice.reducer;

export const { setLocation } = mapSlice.actions;

// export const getTypes = (input) => async (dispatch) => {
//   try {
//     const res = await typeService.getAllTypes(input);
//     dispatch(setTypes(res.data.types));
//     return res.data.types;
//   } catch (err) {
//     console.log(err);
//   }
// };