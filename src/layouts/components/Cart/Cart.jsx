import { isEmpty } from 'lodash';
import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import Badge from 'src/components/Badge';
import Button from 'src/components/Button';
import { BasketIcon } from 'src/components/Icons';
import useCart from 'src/hooks/useCart';
import { cartState, userState } from 'src/recoils';
import { PATH } from 'src/routes';

export default function Cart() {
  const { user } = useRecoilValue(userState);

  const { cart } = useCart(user?._id);

  const setCart = useSetRecoilState(cartState);

  useEffect(() => {
    !isEmpty(cart) && setCart(cart);
  }, [cart]);

  return (
    <Badge badgeContent={cart?.length || 0}>
      <Button icon internalLink={PATH.home} wrapper="absolute top-2/4 -translate-y-2/4">
        <BasketIcon />
      </Button>
    </Badge>
  );
}
