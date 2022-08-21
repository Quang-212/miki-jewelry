import Button from '../Button';
import { DoubleArrowLeftIcon, KeyboardArrowRightIcon } from '../Icons';
import classNames from 'classnames/bind';
import styles from './Pagination.module.css';

const mk = classNames.bind(styles);

export default function Pagination({ page, setPage, total, limit, wrapper }) {
  const PaginationWrapper = 'nav';
  const PaginationButton = Button;
  const PaginationLabel = 'label';

  const goToFirstPage = () => setPage(1);
  const goToLastPage = () => setPage(getLastPage());
  const incrementPage = () => page < getLastPage() && setPage(page + 1);
  const decrementPage = () => page > 1 && setPage(page - 1);
  const atFirstPage = () => page === 1;
  const atLastPage = () => page === getLastPage();
  const getLastPage = () => Math.ceil(total / limit);

  console.log(total, limit, page);
  console.log(getLastPage());

  const classWrapper = mk('root', {
    [wrapper]: wrapper,
  });

  return (
    <PaginationWrapper className={classWrapper}>
      <PaginationButton outline onClick={() => goToFirstPage()} disabled={atFirstPage()}>
        First
      </PaginationButton>
      <PaginationButton outline onClick={() => decrementPage()} disabled={atFirstPage()}>
        <KeyboardArrowRightIcon />
      </PaginationButton>
      <PaginationLabel>{page}</PaginationLabel>
      <PaginationButton outline onClick={incrementPage} disabled={atLastPage()}>
        <KeyboardArrowRightIcon />
      </PaginationButton>
      <PaginationButton outline onClick={goToLastPage} disabled={atFirstPage()}>
        Last
      </PaginationButton>
    </PaginationWrapper>
  );
}
