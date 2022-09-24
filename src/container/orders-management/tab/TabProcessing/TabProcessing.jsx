import classNames from 'classnames/bind';
import { OrderItem } from '../common';

import styles from './TabProcessing.module.css';

const mk = classNames.bind(styles);

export default function TabProcessing({ orders }) {
  return (
    <ul className={mk('tab-processing')}>
      {orders?.map((order, index) => (
        <li key={order._id}>
          <OrderItem data={order} index={index} />
        </li>
      ))}
    </ul>
  );
}
