import { createSlice } from '@reduxjs/toolkit';
import * as userService from '../api/userApi';
import { toast } from 'react-toastify';

const FavoriteSlice = createSlice({
  name: 'favorite',
  initialState: {
    items: [],
  },
  reducers: {
    setFavorites: (state, action) => {
      state.items = action.payload;
    },
    addFavorite: (state, action) => {
      console.log(action.payload)
      state.items.unshift(action.payload);
    },
  },
});

export default FavoriteSlice.reducer;

export const { setFavorites, addFavorite } = FavoriteSlice.actions;

export const createFavorite = (input) => async (dispatch) => {
  try {
    const res = await userService.addFavorite(input);
    dispatch(addFavorite(res.data.favorite));
    toast.success('Add favorite successfully');
    return res.data.favorite;
  } catch (err) {
    console.log(err);
  }
};

export const getFavorites = () => async (dispatch) => {
  try {
    const res = await userService.getFavorites();
    dispatch(setFavorites(res.data.favorites));
    return res.data.favorites;
  } catch (err) {
    console.log(err);
  }
};
