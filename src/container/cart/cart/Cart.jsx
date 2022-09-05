import classNames from 'classnames/bind';

import { NormalDivider } from 'src/components/Dividers';
import CartItem from './CartItem';
import styles from './Cart.module.css';

const mk = classNames.bind(styles);

export default function Cart() {
  return (
    <section className={mk('cart')}>
      <h3 className={mk('heading-3')}>Giỏ hàng</h3>
      <ul className={mk('cart-list')}>
        <li>
          <CartItem />
        </li>
        <NormalDivider />
        <li>
          <CartItem />
        </li>
        <NormalDivider />
        <li>
          <CartItem />
        </li>
        <NormalDivider />
      </ul>
    </section>
  );
}
