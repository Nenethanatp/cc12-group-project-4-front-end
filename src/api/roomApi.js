import axios from '../config/axios';

export const getRoom = (userId1, userId2) =>
  axios.get(`/room/findRoom/${userId1}/${userId2}`);

export const createRoom = (room, userId1, userId2) =>
  axios.post('/room/create', { room, userId1, userId2 });

export const createMessage = (room, userId, message) =>
  axios.post('/room/createMessage', { room, userId, message });

export const getAllMessages = (room) => axios.get(`/room/get/${room}`);

export const getAllChatRooms = () => axios.get('/room/getAll');
