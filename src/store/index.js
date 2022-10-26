import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import postReducer from './postSlice';
import typeReducer from './typeSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,
    types: typeReducer,
  },
});
