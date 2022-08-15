import axios from 'axios';

export const uploadFile = (data, options) => {
  return axios({
    method: 'POST',
    url: '/api/upload',
    data,
    ...options,
  });
};
