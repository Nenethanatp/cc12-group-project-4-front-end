import axios from '../config/axios';

export const getAllReported = () => axios.get('/admin//post/reported');

export const deletePostApi = (id) => axios.delete(`/admin/post/${id}`);
