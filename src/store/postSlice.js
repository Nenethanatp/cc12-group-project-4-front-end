import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import * as postService from '../api/postApi';
import { toast } from 'react-toastify';

const PostSlice = createSlice({
  name: 'post',
  initialState: {
    items: [],
    filter1: [],
    filter2: [],
    selected: [],
  },
  reducers: {
    addPost: (state, action) => {
      state.items.push(action.payload);
    },
    setPosts: (state, action) => {
      state.items = action.payload;
    },   
    updatePost: (state, action) => {
      const idx = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (idx >= 0) {
        state.items.splice(idx, 1, action.payload);
      } else {
        state.items.push(action.payload);
      }
    },
    deletePost: (state, action) => {
      const idx = state.items.findIndex((item) => item.id === action.payload);
      if (idx >= 0) {
        state.items.splice(idx, 1);
      }
    },
    deletePostImage: (state, action) => {
      const post = state.items.find((item) => item.id === action.payload.id);
      if (post) {
        if (post.PostImages) {
          const idx = post.PostImages.findIndex(
            (image) => image.id === action.payload.imageId
          );
          if (idx >= 0) {
            post.PostImages.splice(idx, 1);
          }
        }
      }
    },
  },
});

export default PostSlice.reducer;

export const { addPost, setPosts, updatePost, deletePost, deletePostImage } =
  PostSlice.actions;

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

export const getPostsByTypeId = (typeId) => async (dispatch) => {
  try {
    const res = await postService.getByTypeId(typeId);
    dispatch(setPosts(res.data.posts));
  } catch (err) {
    console.log(err);
    toast.error('No any post about this type');
  }
};

export const getPostById = (id) => async (dispatch) => {
  try {
    const res = await postService.getById(id);
    dispatch(updatePost(res.data.post));
  } catch (err) {
    console.log(err);
    toast.error('Failed to get posts!');
  }
};

export const editPost = (id, payload) => async (dispatch) => {
  try {
    const res = await postService.update(id, payload);
    dispatch(updatePost(res.data.post));
    toast.success('Post updated');
  } catch (err) {
    console.log(err);
    toast.error('Failed to get posts!');
  }
};

export const destroyPost = (id) => async (dispatch) => {
  try {
    const res = await postService.destroy(id);
    dispatch(deletePost(id));
    toast.success('Post deleted');
  } catch (err) {
    console.log(err);
    toast.error('Failed to delete post!');
  }
};

export const destroyPostImage = (id, imageId) => async (dispatch) => {
  try {
    const res = await postService.deletePostImage(id, imageId);
    dispatch(deletePostImage({ id, imageId }));
    toast.success('Post Image deleted');
  } catch (err) {
    console.log(err);
    toast.error('Failed to delete post image!');
  }
};
