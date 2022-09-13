import classNames from 'classnames/bind';

import { NormalDivider } from 'src/components/Dividers';
import CartItem from './CartItem';
import styles from './Cart.module.css';
import { cartState } from 'src/recoils';
import { Fragment } from 'react';
import { useRecoilValue } from 'recoil';
import { useClientSide } from 'src/hooks';

const mk = classNames.bind(styles);

export default function Cart() {
  const cart = useRecoilValue(cartState);
  const isClient = useClientSide();

  return (
    <section className={mk('cart')}>
      <h3 className={mk('heading-3')}>Giỏ hàng</h3>
      <ul className={mk('cart-list')}>
        {isClient &&
          cart.map((cartItem) => (
            <Fragment key={cartItem.cartId}>
              <li>
                <CartItem data={cartItem} />
              </li>
              <NormalDivider />
            </Fragment>
          ))}
      </ul>
    </section>
  );
}
