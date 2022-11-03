import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import * as subscriptionApi from '../api/subscriptionApi';

const SubscribeSlice = createSlice({
  name: 'subscribe',
  initialState: {
    endDate: '',
  },
  reducers: {
    setEndDate: (state, action) => {
      state.endDate = action.payload;
    },
    resetEndDate: (state, action) => {
      state.endDate = null;
    },
  },
});

export default SubscribeSlice.reducer;

export const { setEndDate, resetEndDate } = SubscribeSlice.actions;

export const getEndDate = () => async (dispatch) => {
  try {
    const res = await subscriptionApi.getEndDate();
    dispatch(setEndDate(res.data.endDate));
  } catch (err) {
    console.log(err);
    toast.error(err.response?.data.message);
  }
};
