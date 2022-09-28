import axios from 'axios';
import qs from 'qs';
const { default: axiosInstance } = require('src/utils/axios');

export const createFeedback = async (data, option) => {
  return await axiosInstance({
    method: 'POST',
    url: '/api/feedback/create',
    data,
    ...option,
  });
};

export const getFeedbackByFilters = async (query = {}, option) => {
  const queryString = qs.stringify(query);

  return await axios({
    method: 'GET',
    url: `/api/feedback?${queryString}`,
    ...option,
  });
};

export const getStableFeedbackProperties = async (query = {}, option) => {
  const queryString = qs.stringify(query);

  return await axios({
    method: 'GET',
    url: `/api/feedback/stable-properties?${queryString}`,
    ...option,
  });
};
