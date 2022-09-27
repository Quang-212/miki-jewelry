import useSWR from 'swr';
import qs from 'qs';

export default function useFeedback(query = {}) {
  const queryString = qs.stringify(query);

  const url = `/api/feedback?${queryString}`;
  const { data = {}, error } = useSWR(query.productId ? url : null);

  return {
    data: data.data?.data,
    error,
  };
}
