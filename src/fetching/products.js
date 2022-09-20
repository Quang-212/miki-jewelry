import axios from 'axios';
import { isEmpty } from 'lodash';
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

export const updateProduct = (data, value, options) => {
  return axiosInstance({
    method: 'PATCH',
    url: `/api/products/update?id=${value}`,
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
      ? process.env.API_URL || process.env.NEXT_PUBLIC_API_URL
      : 'http://localhost:3000';
  return axios({
    method: 'GET',
    url: `${BASE_URL}/api/products/${params.join('/')}?${queryString}`,
    ...options,
  });
};
