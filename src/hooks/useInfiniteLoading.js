import qs from 'qs';
import useSWRInfinite from 'swr/infinite';

import axiosInstance from 'src/utils/axios';

export default function useInfiniteLoading(params = [], query = {}, options, isSearch) {
  const PAGE_SIZE = 6;

  const queryString = qs.stringify(query);

  const getKey = (pageIndex, previousPageData) => {
    pageIndex = pageIndex + 1;
    // if (previousPageData && !previousPageData.length) return null; // reached the end

    return `/api/order/${params.join('/')}?${queryString}`;
  };

  const fetcher = async (url) => {
    const res = await axiosInstance.get(url);
    return res.data.data || [];
  };

  const { data, error, size, setSize } = useSWRInfinite(getKey, fetcher, options);

  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData || (size > 0 && data && typeof data[size - 1] === 'undefined');

  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);

  return {
    data,
    error,
    size,
    setSize,
    isLoadingMore,
    isReachingEnd,
  };
}
