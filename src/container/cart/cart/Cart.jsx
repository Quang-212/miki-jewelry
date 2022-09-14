import classNames from 'classnames/bind';

import { NormalDivider } from 'src/components/Dividers';
import CartItem from './CartItem';
import styles from './Cart.module.css';
import { cartState } from 'src/recoils';
import { Fragment, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useClientSide } from 'src/hooks';
import { Checkbox } from 'src/components/Checkbox';
import { isEmpty } from 'lodash';

const mk = classNames.bind(styles);

export default function Cart() {
  const cart = useRecoilValue(cartState);
  const isClient = useClientSide();

  const [checked, setChecked] = useState({ orders: [], ready: false });

  useEffect(() => {
    setChecked({ orders: JSON.parse(sessionStorage.getItem('orders')) || [], ready: true });
  }, []);

  useEffect(() => {
    checked.ready && sessionStorage.setItem('orders', JSON.stringify(checked.orders));
  }, [checked]);

  const handleCheckBox = (cartId) => {
    setChecked((prev) => {
      const { orders } = prev;
      return orders.find((item) => item === cartId)
        ? { ...prev, orders: orders.filter((item) => item !== cartId) }
        : { ...prev, orders: [...orders, cartId] };
    });
  };

  const handleCheckBoxSize = (staleId, newId) => {
    setChecked((prev) => {
      const { orders } = prev;
      return { ...prev, orders: orders.map((item) => (item === staleId ? newId : item)) };
    });
  };

  const handleCheckAll = () => {
    setChecked((prev) => ({
      ...prev,
      orders: checked.orders.length !== cart.length ? cart.map((item) => item.cartId) : [],
    }));
  };

  return (
    <section className={mk('cart')}>
      <h3 className={mk('heading-3')}>Giỏ hàng</h3>
      <ul className={mk('cart-list')}>
        {isClient &&
          cart.map((cartItem) => (
            <Fragment key={cartItem.cartId}>
              <li>
                <CartItem
                  data={cartItem}
                  orders={checked.orders}
                  onCheck={handleCheckBox}
                  onCheckSizeChange={handleCheckBoxSize}
                />
              </li>
              <NormalDivider />
            </Fragment>
          ))}
      </ul>
      <Checkbox
        className="w-8 h-8"
        checked={checked.orders.length === cart.length}
        onChange={handleCheckAll}
      />
    </section>
  );
}
