import axios from 'axios';

export const createProduct = (data, options) => {
  return axios({
    method: 'POST',
    url: '/api/products/create',
    data,
    ...options,
  });
};
