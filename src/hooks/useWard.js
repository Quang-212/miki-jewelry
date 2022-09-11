import useSWR from 'swr';

export default function useWard(districtCode) {
  const url = `https://provinces.open-api.vn/api/d/${districtCode}?depth=2`;

  const { data: { wards = [] } = {}, error } = useSWR(districtCode ? url : null);
  return {
    wards,
    error,
  };
}
