import axios from 'axios';

export const deleteImage = (data, options) => {
  return axios({
    method: 'POST',
    url: '/api/image/delete',
    data,
    ...options,
  });
};
