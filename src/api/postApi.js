import axios from "../config/axios";

export const getAll = () => axios.get("/posts");

export const getByTypeId = (typeId) => axios.get(`/posts?typeId=${typeId}`);

export const getById = (id) => axios.get(`/posts/${id}`);

export const getPostsByFollowing = () => axios.get("/posts/follows");

export const create = (input) => axios.post("/posts", input);

export const update = (id, input) => axios.put(`/posts/${id}`, input);

export const destroy = (id) => axios.delete(`/posts/${id}`);

export const toggleLike = (id) => axios.post(`/posts/${id}/likes`);

export const toggleReport = (id) => axios.post(`/posts/${id}/reports`);

export const deletePostImage = (id, imageId) =>
  axios.delete(`/posts/${id}/images/${imageId}`);
