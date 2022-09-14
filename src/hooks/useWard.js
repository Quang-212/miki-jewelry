import useSWR from 'swr';

export default function useWard(districtCode) {
  const url = `https://provinces.open-api.vn/api/d/${districtCode}?depth=2`;

  const { data, error } = useSWR(districtCode ? url : null);

  const wards = data?.data.wards || [];

  return {
    wards,
    error,
  };
}
