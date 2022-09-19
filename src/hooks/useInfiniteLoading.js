import qs from 'qs';
import useSWRInfinite from 'swr/infinite';

import axiosInstance from 'src/utils/axios';
import { isEmpty } from 'lodash';

export default function useInfiniteLoading(params = [], query = {}, options, isSearch) {
  const PAGE_SIZE = 6;

  const getKey = (pageIndex, previousPageData) => {
    pageIndex = pageIndex + 1;
    query = { ...query, page: pageIndex - 1 }; //do page start with 0 (due to SERVER)

    const queryString = qs.stringify(query);

    // if (previousPageData && !previousPageData.length) return null; // reached the end

    return `/api/order/${params.join('/')}?${queryString}`;
  };

  const fetcher = async (url) => {
    const res = await axiosInstance.get(url);
    return res.data.data || {};
  };

  const { data, error, size, setSize } = useSWRInfinite(getKey, fetcher, options);
  // console.log('data ', data[0].orders);

  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData || (size > 0 && data && typeof data[size - 1] === 'undefined');

  const isEmptyPag = data?.[0]?.length === 0;
  const isReachingEnd = isEmptyPag || (data && data[data.length - 1]?.length < PAGE_SIZE);

  return {
    data: isEmpty(data)
      ? {}
      : { ...data[data.length - 1], orders: data.map((item) => item.orders).flat(1) },
    error,
    size,
    setSize,
    isLoadingMore,
    isReachingEnd,
  };
}
