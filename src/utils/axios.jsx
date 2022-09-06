import axios from 'axios';
import decode from 'jwt-decode';

import { getLocalStorage, setLocalStorage } from './handleLocalStorage';

const recoilPersist = getLocalStorage('recoil-persist');

const getToken = () => recoilPersist?.authentication.access_token ?? '';

const setToken = (token) => {
  setLocalStorage('recoil-persist', {
    ...recoilPersist,
    authentication: { ...recoilPersist.authentication, access_token: token },
  });
};

const axiosInstance = axios.create({
  baseURL: process.env.NEXTJS_APP_BASE_URL,
  timeout: 16000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    config.headers = {
      ...(getToken() && { Authorization: `Bearer ${getToken()}` }),
    };

    const now = new Date();

    const payload = getToken() && decode(getToken());
    if (payload && payload.exp * 1000 < now.getTime() && !config._retry) {
      // console.log('get token');
      config._retry = true;

      try {
        const res = await axios({
          method: 'POST',
          data: {
            _id: payload._id,
            role: payload.role,
          },
          url: `${process.env.NEXTJS_APP_BASE_URL}/api/auth/refreshtoken`,
          withCredentials: true,
        });

        const newToken = res.data.accessToken;
        setToken(newToken);

        config.headers = {
          ...(getToken() && { Authorization: `Bearer ${getToken()}` }),
        };
      } catch (error) {
        console.log(error);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      console.log('401 error');
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
