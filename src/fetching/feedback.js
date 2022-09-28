const { default: axiosInstance } = require('src/utils/axios');

export const createFeedback = async (data, option) => {
  return await axiosInstance({
    method: 'POST',
    url: '/api/feedback/create',
    data,
    ...option,
  });
};
