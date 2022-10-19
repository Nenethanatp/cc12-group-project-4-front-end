import { createSlice } from '@reduxjs/toolkit';
import * as typeService from '../api/typeApi';

const TypeSlice = createSlice({
  name: 'types',
  initialState: {
    value: null
  },
  reducers: {
    setTypes: (state, action) => {
      state.value = action.payload;
    },
  }
});

export default TypeSlice.reducer;

export const { setTypes } = TypeSlice.actions;

export const getTypes = (input) => async (dispatch) => {
  try {
    const res = await typeService.getAllTypes(input);
    dispatch(setTypes(res.data.types));
    return res.data.types;
  } catch (err) {
    console.log(err);
  }
};
