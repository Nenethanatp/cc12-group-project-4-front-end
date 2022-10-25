import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import postReducer from "./postSlice";
import mapReducer from "./mapSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,
    map: mapReducer,
  },
});
