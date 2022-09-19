import axios from 'axios';
import { isEmpty } from 'lodash';
import qs from 'qs';

import axiosInstance from 'src/utils/axios';

export const createFavorite = (data, options) => {
  return axios({
    method: 'POST',
    url: '/api/favorite-product',
    data,
    ...options,
  });
};
