import axios from '../config/axios';

export const getUserByName = (input) => axios.get(`/user/find?name=${input}`);
