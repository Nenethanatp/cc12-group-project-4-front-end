import { createSlice } from '@reduxjs/toolkit';
import * as authService from '../api/authApi';
import { addAccessToken, getAccessToken } from '../utils/localStorage';

const AuthSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null
  },
  reducers: {
    getMe: (state, action) => {
      state.user = action.payload;
    },
    logout: (state, action) => {
      state.user = null;
    }
  }
});

export default AuthSlice.reducer;

export const { getMe, logout } = AuthSlice.actions;

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

export const googleLogin = (input) => async (dispatch) => {
  try {
    if (getAccessToken()) {
      return alert('please logout before login');
    }
    const result = await authService.loginGoogle(input);
    addAccessToken(result.data.token);
    const resMe = await authService.getMe();
    dispatch(getMe(resMe.data.user));
  } catch (err) {
    console.log(err);
  }
};
