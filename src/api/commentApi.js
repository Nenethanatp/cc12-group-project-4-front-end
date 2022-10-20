import axios from '../config/axios';

export const createCommentApi = (id, input) =>
  axios.post(`/posts/${id}/comments`, input);
