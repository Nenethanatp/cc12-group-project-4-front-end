import axios from '../config/axios';

export const getAllReported = () => axios.get('/admin//post/reported');
