import qs from 'qs';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

import axiosInstance from 'src/utils/axios';
import { isArray } from 'lodash';
import useRouter from './useRouter';

export default function useMyInfiniteLoading(params = [], query = {}, isSearch, options) {
  const initialState = {
    page: 0,
    total: 0,
    pageCount: 0,
    orders: [],
  };

  const [newData, setNewData] = useState(initialState);

  const queryString = qs.stringify(query);

  const url = `/api/order/${params.join('/')}?${queryString}`;

  const fetcher = async (url) => {
    const res = await axiosInstance.get(url);
    return res.data.data || {};
  };

  const { data, error } = useSWR(url, fetcher, options);
  //* if error => console not on screen
  // console.log(data, error);

  const { query: queryRouter } = useRouter();

  useEffect(() => {
    isArray(data?.orders) &&
      setNewData((prev) => {
        if (isSearch) {
          return data;
        } else {
          return {
            ...data,
            orders: [...prev.orders, ...data.orders],
          };
        }
      });
  }, [data]);

  useEffect(() => {
    return () => setNewData(initialState);
  }, [queryRouter]);

  return {
    data: newData || null,
    isError: error,
    isLoadingMore: !data && !error,
    isReachingEnd: newData.page >= newData.pageCount - 1,
  };
}
