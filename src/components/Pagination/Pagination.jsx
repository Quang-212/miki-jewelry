import classNames from 'classnames/bind';
import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.css';

const mk = classNames.bind(styles);

export default function Pagination({ pageCount, onPageChange, previousLabelIcon, nextLabelIcon }) {
  return (
    <ReactPaginate
      pageCount={pageCount}
      pageRangeDisplayed="3"
      marginPagesDisplayed="2"
      previousLabel={previousLabelIcon ? previousLabelIcon : 'previous'}
      breakLabel="..."
      nextLabel={nextLabelIcon ? nextLabelIcon : 'next'}
      onPageChange={onPageChange}
      renderOnZeroPageCount={null}
      className={mk('wrapper')}
      pageClassName={mk('page')}
      previousClassName={mk('previous')}
      breakClassName={mk('break')}
      nextClassName={mk('next')}
    />
  );
}
