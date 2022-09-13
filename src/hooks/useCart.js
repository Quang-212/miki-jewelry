import useSWR from 'swr';

import axiosInstance from 'src/utils/axios';

export default function useCart(userId) {
  const url = `/api/cart?userId=${userId}`;

  const { data = {}, error } = useSWR(userId ? url : null, (url) => axiosInstance(url));
  return {
    cart: data.data?.cart,
    error,
  };
}
