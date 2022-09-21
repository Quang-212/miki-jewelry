import axiosInstance from 'src/utils/axios';

export const uploadFile = (data, options) => {
  return axiosInstance({
    method: 'POST',
    url: '/api/upload/create',
    data,
    ...options,
  });
};

export const deleteImage = (data, options) => {
  return axiosInstance({
    method: 'POST',
    url: '/api/upload/delete',
    data,
    ...options,
  });
};
