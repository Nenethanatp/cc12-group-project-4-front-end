import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import * as authService from '../api/authApi';
import { addAccessToken, getAccessToken } from '../utils/localStorage';

const AuthSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    status: null,
    isLogin: false,
  },
  reducers: {
    getMe: (state, action) => {
      state.user = action.payload.user;
      state.status = action.payload.status;
      state.ggSignin = action.payload.ggSignin;
      state.isLogin = true;
    },

    logout: (state, action) => {
      state.user = null;
      state.status = null;
      state.ggSignin = null;
      state.isLogin = false;
    },
  },
});

export default AuthSlice.reducer;

export const { getMe, logout } = AuthSlice.actions;

export const register = (input) => async (dispatch) => {
  try {
    const res = await authService.register(input);
    addAccessToken(res.data.token);
    const resMe = await authService.getMe();
    dispatch(getMe(resMe.data));
  } catch (err) {
    console.log(err);
    toast.error(err.response.data.message);
  }
};

export const login = (input) => async (dispatch) => {
  try {
    const res = await authService.login(input);
    addAccessToken(res.data.token);
    const resMe = await authService.getMe();
    dispatch(getMe(resMe.data));
  } catch (err) {
    console.log(err);
    toast.error(err.response?.data.message);
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
    dispatch(getMe(resMe.data));
  } catch (err) {
    console.log(err);
    toast.error(err.response.data.message);
  }
};
