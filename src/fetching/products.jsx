import axios from 'axios';
import qs from 'qs';

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
  const queryString = qs.stringify(query);
  return axios({
    method: 'GET',
    url: `http://localhost:3000/api/products?${queryString}`,
    ...options,
  });
};
