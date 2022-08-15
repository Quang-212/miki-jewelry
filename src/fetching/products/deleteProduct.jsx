import axios from 'axios';

export const deleteProduct = (data, options) => {
  return axios({
    method: 'POST',
    url: '/api/products/delete',
    data,
    ...options,
  });
};
