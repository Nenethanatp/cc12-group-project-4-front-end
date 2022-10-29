import axios from '../config/axios';

export const getUserByName = (input) => axios.get(`/user/find?name=${input}`);

export const updateUserApi = (input) => axios.patch(`/user/me`, input);

export const addFavorite = (input) => axios.post('/user/add-favorite', input);
export const getFavorites = () => axios.get('/user/favorites');
export const deleteFavorite = (id) => axios.delete(`/user/favorites/${id}`);