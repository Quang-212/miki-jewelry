import axios from 'axios';
import decode from 'jwt-decode';

import { getLocalStorage, setLocalStorage } from './handleLocalStorage';

const recoilPersist = getLocalStorage('recoil-persist');

const getToken = () => {
  if (typeof window !== 'undefined') {
    return getLocalStorage('recoil-persist')?.authentication.access_token;
  }
  return '';
};

const setToken = (token) => {
  setLocalStorage('recoil-persist', {
    ...recoilPersist,
    authentication: { ...recoilPersist.authentication, access_token: token },
  });
};

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      console.log('401 error');
    }
    return Promise.reject(error);
  },
);

const axiosInstance = axios.create({
  timeout: 16000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const now = new Date();

    const payload = getToken() && decode(getToken());
    if (payload && payload.exp * 1000 < now.getTime() && !config._retry) {
      config._retry = true;

      try {
        const res = await axios({
          method: 'POST',
          data: {
            _id: payload._id,
            role: payload.role,
          },
          url: `/api/auth/refresh-token`,
          withCredentials: true,
        });

        const newToken = res.data.accessToken;
        setToken(newToken);
      } catch (error) {
        console.log(error);
      }
    }
    config.headers = {
      ...(getToken() && { Authorization: `Bearer ${getToken()}` }),
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
