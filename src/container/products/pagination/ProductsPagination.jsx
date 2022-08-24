import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { KeyboardArrowRightIcon } from 'src/components/Icons';
import Pagination from 'src/components/Pagination';
import { useProducts } from 'src/hooks/useProducts';

export function ProductsPaginationSection() {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(16);

  const router = useRouter();
  const { query, pathname, push } = router;

  const { productsState, isLoading } = useProducts({
    page: page,
    limit,
    select: {
      _id: 1,
      name: 1,
      images: 1,
      stocks: 1,
    },
  });

  const pageCount = Math.ceil(productsState?.total / limit);

  useEffect(() => {
    if (query.page) {
      let p = Number(query.page) >= 0 ? query.page : 0;
      setPage(Number(p));
    }
    if (query.limit) {
      let l = Number(query.limit) >= 10 ? query.limit : 10;
      setLimit(Number(l));
    }
  }, [query.page, query.limit]);

  const handlePageClick = (event) => {
    if (pathname !== '/products') return;
    const pageIndex = event.selected;
    push(`?page=${pageIndex}&limit=${limit}`);
  };

  return (
    <div className="flex justify-end mt-4">
      <Pagination
        pageCount={pageCount}
        onPageChange={handlePageClick}
        nextLabelIcon={<KeyboardArrowRightIcon />}
      />
    </div>
  );
}
