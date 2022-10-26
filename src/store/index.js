import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import typeReducer from './typeSlice';
import postReducer from './postSlice';
import mapReducer from './mapSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,
    types: typeReducer,
    map: mapReducer,
  },
});
