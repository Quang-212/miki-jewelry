import axios from 'axios';
import qs from 'qs';

import axiosInstance from 'src/utils/axios';

export const createProduct = (data, options) => {
  return axiosInstance({
    method: 'POST',
    url: '/api/products/create',
    data,
    ...options,
  });
};

export const updateProduct = (data, options) => {
  return axiosInstance({
    method: 'PATCH',
    url: `/api/products/update`,
    data,
    ...options,
  });
};

export const deleteProduct = (data, options) => {
  return axiosInstance({
    method: 'POST',
    url: '/api/products/delete',
    data,
    ...options,
  });
};

export const getProducts = (params = [], query, options) => {
  const queryString = qs.stringify(query);
  const BASE_URL =
    process.env.NODE_ENV === 'production'
      ? process.env.PRODUCTION_BASE_URL
      : process.env.DEV_BASE_URL;

  return axios({
    method: 'GET',
    url: `/api/products/${params.join('/')}?${queryString}`,
    ...options,
  });
};
