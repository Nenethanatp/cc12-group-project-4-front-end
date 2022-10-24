import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import * as postService from '../api/postApi';
import { toast } from 'react-toastify';

const PostSlice = createSlice({
  name: 'post',
  initialState: {
    items: [],filter1: [], filter2:[], seleted: []
  },
  reducers: {
    addPost: (state, action) => {
      state.items.push(action.payload);
    },
    setPosts: (state, action) => {
      state.items = action.payload;
    },
  },
});

export default PostSlice.reducer;

export const { addPost, setPosts } = PostSlice.actions;

export const createPost = (input) => async (dispatch) => {
  try {
    const res = await postService.create(input);
    dispatch(addPost(res.data.post));
    toast.success('Post created');
  } catch (err) {
    console.log(err);
    // toast.error(err.response?.data.message)
    toast.error('Failed to created post!');
  }
};

export const getPosts = () => async (dispatch) => {
  try {
    const res = await postService.getAll();
    dispatch(setPosts(res.data.posts));
  } catch (err) {
    console.log(err);
    toast.error('Failed to get posts!');
  }
};
