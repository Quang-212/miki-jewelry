import axios from 'axios';

export const createProduct = (data, options) => {
  return axios({
    method: 'POST',
    url: '/api/products/create',
    data,
    ...options,
  });
};

export const updateProduct = (data, value, options) => {
  return axios({
    method: 'PATCH',
    url: `/api/products/update?id=${value}`,
    data,
    ...options,
  });
};

export const deleteProduct = (data, options) => {
  return axios({
    method: 'POST',
    url: '/api/products/delete',
    data,
    ...options,
  });
};

export const getProducts = (query, options) => {
  return axios({
    method: 'GET',
    url: `http://localhost:3000/api/products`,
    params: query,
    ...options,
  });
};
