import axios from '../config/axios';

export const getAllTypes = () => axios.get('/types');
