import axios from '../config/axios';

export const toggleFollow = (id) => axios.post(`/follows/${id}`);

export const getFollow = () => axios.get(`/follows/me`);

export const getAllFollowApi = (id) => axios.get(`/follows/${id}`);
