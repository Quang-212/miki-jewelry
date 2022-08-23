import classNames from 'classnames/bind';
import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.css';

const mk = classNames.bind(styles);

export default function Pagination({ pageCount, onPageChange, previousLabelIcon, nextLabelIcon }) {
  return (
    <ReactPaginate
      pageCount={pageCount}
      pageRangeDisplayed="4"
      marginPagesDisplayed="2"
      previousLabel={previousLabelIcon ? previousLabelIcon : 'previous'}
      breakLabel="..."
      nextLabel={nextLabelIcon ? nextLabelIcon : 'next'}
      onPageChange={onPageChange}
      renderOnZeroPageCount={null}
      className="flex items-center"
      pageClassName="flex items-center justify-center w-10 h-10 border border-primary solid"
      breakClassName="flex items-center justify-center w-10 h-10 border border-primary solid"
      nextClassName="flex items-center justify-center w-10 h-10 border border-primary solid"
    />
  );
}
