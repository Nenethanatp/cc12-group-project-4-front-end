import { createSlice } from '@reduxjs/toolkit';
import * as postService from '../api/postApi';

const PostSlice = createSlice({
  name: 'post',
  initialState: {
    items: []
  },
  reducers: {
    addPost: (state, action) => {
      state.items.push(action.payload);
    },
    setPosts: (state, action) => {
      state.items = action.payload;
    },
  }
});

export default PostSlice.reducer;

export const { addPost, setPosts } = PostSlice.actions;

export const createPost = (input) => async (dispatch) => {
  try {
    const res = await postService.create(input);
    dispatch(addPost(res.data.post))
  } catch (err) {
    console.log(err);
  }
}

export const getPosts = () => async (dispatch) => {
  try {
    const res = await postService.getAll();
    dispatch(setPosts(res.data.posts))
  } catch (err) {
    console.log(err);
  }
}
