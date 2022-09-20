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

  return axios({
    method: 'GET',
    url: `${process.env.BASE_URL}/api/products/${params.join('/')}?${queryString}`,
    ...options,
  });
};
