import { createSlice } from '@reduxjs/toolkit';
import * as authService from '../api/authApi';
import { addAccessToken } from '../utils/localStorage';

const AuthSlice = createSlice({
  name: 'auth',
  initialState: {
    user: { firstName: '', lastName: '', email: '', imageUrl: '' }
  },
  reducers: {
    getMe: (state, action) => {
      state.user = action.payload;
    }
  }
});

export default AuthSlice.reducer;

export const { getMe } = AuthSlice.actions;

export const register = (input) => async (dispatch) => {
  try {
    const res = await authService.register(input);
    addAccessToken(res.data.token);
    const resMe = await authService.getMe();
    dispatch(getMe(resMe.data.user));
  } catch (err) {
    console.log(err);
  }
};

export const login = (input) => async (dispatch) => {
  try {
    const res = await authService.login(input);
    addAccessToken(res.data.token);
    const resMe = await authService.getMe();
    dispatch(getMe(resMe.data.user));
  } catch (err) {
    console.log(err);
  }
};
