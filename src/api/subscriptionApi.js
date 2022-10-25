import axios from '../config/axios';

export const payment = (input) => {
  return axios.post('/subscribe', input);
};

export const getAllPackage = () => {
  return axios.get('/subscribe/allPackage');
};
