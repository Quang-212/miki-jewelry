import classNames from 'classnames/bind';
import { Fragment, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { Checkbox } from 'src/components/Checkbox';
import { NormalDivider } from 'src/components/Dividers';
import { useClientSide } from 'src/hooks';
import { cartState } from 'src/recoils';
import styles from './Cart.module.css';
import CartItem from './CartItem';

const mk = classNames.bind(styles);

export default function CartDetails({ setChecked, checked }) {
  const cart = useRecoilValue(cartState);

  const isClient = useClientSide();

  const handleCheckBox = (_id) => {
    setChecked((prev) => {
      const { orders } = prev;
      return orders.find((item) => item === _id)
        ? { ...prev, orders: orders.filter((item) => item !== _id) }
        : { ...prev, orders: [...orders, _id] };
    });
  };

  const handleCheckAll = () => {
    setChecked((prev) => ({
      ...prev,
      orders: checked.orders.length !== cart.length ? cart.map((item) => item._id) : [],
    }));
  };

  return (
    <>
      {isClient && (
        <section className={mk('cart')}>
          <h3 className={mk('font-primary font-semibold text-2xl leading-8 text-primary')}>
            Giỏ hàng
          </h3>
          <ul className={mk('cart-list')}>
            {cart.map((cartItem) => (
              <Fragment key={cartItem._id}>
                <li>
                  <CartItem data={cartItem} orders={checked.orders} onCheck={handleCheckBox} />
                </li>
                <NormalDivider />
              </Fragment>
            ))}
          </ul>
          <Checkbox
            checked={checked.orders.length === cart.length}
            onChange={handleCheckAll}
            className="w-8 h-8"
          />
        </section>
      )}
    </>
  );
}
