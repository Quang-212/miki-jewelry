import classNames from 'classnames/bind';
import { isEmpty } from 'lodash';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import Badge from 'src/components/Badge';
import Button from 'src/components/Button';
import { BasketIcon } from 'src/components/Icons';
import { useClientSide } from 'src/hooks';
import useCart from 'src/hooks/useCart';
import { cartState, userState } from 'src/recoils';
import { PATH } from 'src/routes';
import styles from './Cart.module.css';
import CartPreview from './CartPreview';

const mk = classNames.bind(styles);

export default function Cart() {
  const [cartRecoil, setCart] = useRecoilState(cartState);

  const { user, isAuthenticated } = useRecoilValue(userState);

  const { cart } = useCart(user?._id);

  const isClient = useClientSide();

  useEffect(() => {
    setCart(() => {
      if (!isAuthenticated || isEmpty(cart)) {
        return [];
      }
      return cart;
    });
  }, [cart, isAuthenticated]);

  return (
    <>
      {isClient && (
        <CartPreview cartRecoil={cartRecoil}>
          <Badge badgeContent={cartRecoil?.length || 0}>
            <Button icon internalLink={PATH.CART} wrapper={mk('cart-icon')}>
              <BasketIcon />
            </Button>
          </Badge>
        </CartPreview>
      )}
    </>
  );
}
