import axios from 'axios';
import { isEmpty } from 'lodash';
import qs from 'qs';

import axiosInstance from 'src/utils/axios';

export const addToCart = (data, options) => {
  return axiosInstance({
    method: 'POST',
    url: '/api/cart/create',
    data,
    ...options,
  });
};

export const updateCart = (data, options) => {
  return axiosInstance({
    method: 'PATCH',
    url: '/api/cart/update',
    data,
    ...options,
  });
};

export const deleteCartItem = (options) => {
  return axiosInstance({
    method: 'DELETE',
    url: '/api/cart/delete',
    ...options,
  });
};
