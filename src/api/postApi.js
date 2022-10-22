import axios from '../config/axios';

export const getAll = () => axios.get('/posts');

export const getById = (id) => axios.get(`/posts/${id}`);

export const create = (input) => axios.post('/posts', input);

export const update = (id, input) => axios.put(`/posts/${id}`, input);

export const destroy = (id) => axios.delete(`/posts/${id}`);

export const toggleLike = (id) => axios.post(`/posts/${id}/likes`);
