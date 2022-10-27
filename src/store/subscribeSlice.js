import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import * as subscriptionApi from '../api/subscriptionApi';

const SubscribeSlice = createSlice({
  name: 'subscribe',
  initialState: {
    endDate: 'n',
  },
  reducers: {
    setEndDate: (state, action) => {
      state.endDate = action.payload;
    },
  },
});

export default SubscribeSlice.reducer;

export const { setEndDate } = SubscribeSlice.actions;

export const getEndDate = () => async (dispatch) => {
  try {
    const res = await subscriptionApi.getEndDate();
    console.log(res);
    dispatch(setEndDate(res.data.endDate));
  } catch (err) {
    console.log(err);
    toast.error(err.response?.data.message);
  }
};
