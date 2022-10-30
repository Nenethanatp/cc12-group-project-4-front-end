import axios from 'axios';
import { getAccessToken, removeAccessToken } from '../utils/localStorage';
import { API_ENDPOINT_URL } from './env';

axios.defaults.baseURL = API_ENDPOINT_URL;
// axios.defaults.baseURL =
//   'https://e416-2403-6200-89a6-d9c9-89e-505d-8564-cba2.ap.ngrok.io';
axios.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers['ngrok-skip-browser-warning'] = '*';
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => Promise.reject(err) // same as throw err but axios return promise obj --> can promise chaining
);

axios.interceptors.response.use(
  (response) => response,
  (err) => {
    console.log(err);
    if (err.response.status === 401) {
      removeAccessToken();
      window.location.replace('/');
    }
    return Promise.reject(err);
  }
);

export default axios;
