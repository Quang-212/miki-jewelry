import axiosInstance from 'src/utils/axios';

export const deleteImage = (data, options) => {
  return axiosInstance({
    method: 'POST',
    url: '/api/image/delete',
    data,
    ...options,
  });
};
