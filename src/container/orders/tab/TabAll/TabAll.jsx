import classNames from 'classnames/bind';

import { LoadingRotatingLines } from 'src/components/Loadings';
import { OrderItem } from '../common';

import styles from './TabAll.module.css';

const mk = classNames.bind(styles);

export default function TabAll({ orders }) {
  return (
    <ul className={mk('tab-all')}>
      {orders?.map((order, index) => (
        <li key={order._id}>
          <OrderItem data={order} index={index} />
        </li>
      ))}
      {/* {isLoadingMore && <LoadingRotatingLines className="absolute z-10 left-2/4 top-2/4" />} */}
    </ul>
  );
}
