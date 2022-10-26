import { createSlice } from '@reduxjs/toolkit';
import * as typeService from '../api/typeApi';

const TypeSlice = createSlice({
  name: 'types',
  initialState: {
    value: null,
    selectedType: null,
  },
  reducers: {
    setTypes: (state, action) => {
      state.value = action.payload;
    },
    setSelectedType: (state, action) => {
      state.selectedType = action.payload;
    },
  },
});

export default TypeSlice.reducer;

export const { setTypes, setSelectedType } = TypeSlice.actions;

export const getTypes = () => async (dispatch) => {
  try {
    const res = await typeService.getAllTypes();
    dispatch(setTypes(res.data.type));
    return res.data.type;
  } catch (err) {
    console.log(err);
  }
};
