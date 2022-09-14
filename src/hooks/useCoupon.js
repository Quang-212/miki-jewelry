import qs from 'qs';
import useSWR from 'swr';
import axios from 'axios';

export default function useCoupon(query, options, isSearch) {
  const queryString = qs.stringify(query);

  const url = `/api/coupon?${queryString}`;

  const generateSearchUrl = (query, url) => {
    return query.hasOwnProperty('search') && query.search ? url : null;
  };

  const { data, error } = useSWR(
    isSearch ? generateSearchUrl(query, url) : url,
    (url) => axios.get(url),
    options,
  );
  //* if error => console not on screen
  // console.log(data, error);

  return {
    couponState: data?.data || null,
    isLoading: !error && !data && (query.search || !isSearch),
    isError: error,
  };
}
