import { useRouter } from 'next/router';

import { KeyboardArrowIcon } from 'src/components/Icons';
import Pagination from 'src/components/Pagination';
import { PATH } from 'src/routes';
import searchByQuery from 'src/utils/searchByQuery';

export function ProductsPagination({ pageCount }) {
  const router = useRouter();

  const handlePageClick = (event) => {
    if (router.pathname !== PATH.PRODUCTS) return;
    const pageIndex = event.selected;
    searchByQuery({ router, page: pageIndex });
  };

  return (
    <div className="flex justify-end mt-4">
      <Pagination
        pageCount={pageCount}
        onPageChange={handlePageClick}
        previousLabelIcon={<KeyboardArrowIcon className="rotate-180" />}
        nextLabelIcon={<KeyboardArrowIcon />}
      />
    </div>
  );
}
