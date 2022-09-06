import axiosInstance from 'src/utils/axios';

export const uploadFile = (data, options) => {
  return axiosInstance({
    method: 'POST',
    url: '/api/upload',
    data,
    ...options,
  });
};
