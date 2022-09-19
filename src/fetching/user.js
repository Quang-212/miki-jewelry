import axiosInstance from 'src/utils/axios';

export const updateUser = (data, options) => {
  return axiosInstance({
    method: 'PATCH',
    url: '/api/users/update',
    data,
    ...options,
  });
};
