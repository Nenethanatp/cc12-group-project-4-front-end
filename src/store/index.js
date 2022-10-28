import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import typeReducer from './typeSlice';
import postReducer from './postSlice';
import mapReducer from './mapSlice';
import subscibeReducer from './subscribeSlice';
import favoriteReducer from "./favoriteSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,
    types: typeReducer,
    map: mapReducer,
    subscribe: subscibeReducer,
    favorite: favoriteReducer,
  },
});
