import qs from 'qs';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

import axiosInstance from 'src/utils/axios';
import { isArray } from 'lodash';

export default function useMyInfiniteLoading(params = [], query = {}, isSearch, options) {
  const [newData, setNewData] = useState({
    page: 0,
    total: 0,
    pageCount: 0,
    orders: [],
  });

  const queryString = qs.stringify(query);

  const url = `/api/order/${params.join('/')}?${queryString}`;

  const fetcher = async (url) => {
    const res = await axiosInstance.get(url);
    return res.data.data || {};
  };

  const { data, error } = useSWR(url, fetcher, options);
  //* if error => console not on screen
  // console.log(data, error);

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

  return {
    data: newData || null,
    error,
    isLoadingMore: !data && !error,
    isReachingEnd: newData.page >= newData.pageCount - 1,
  };
}