import { useRouter as useNextRouter } from 'next/router';

export default function useRouter() {
  const router = useNextRouter();
  const { query } = router;
  const page = Number(query.page) >= 0 ? Number(query.page) : 0;
  const limit = Number(query.limit) >= 16 ? Number(query.limit) : 16;

  return {
    ...router,
    page,
    limit,
    query,
  };
}
