import { isEmpty } from 'lodash';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import Badge from 'src/components/Badge';
import Button from 'src/components/Button';
import { BasketIcon } from 'src/components/Icons';
import { useClientSide } from 'src/hooks';
import useCart from 'src/hooks/useCart';
import { cartState, userState } from 'src/recoils';
import { PATH } from 'src/routes';

export default function Cart() {
  const { user } = useRecoilValue(userState);

  const formatCart = (cartServer) => {
    return cartServer.products.map((item) => ({
      cartId: `${item.product._id}${item.size}`,
      quantity: item.quantity,
      size: item.size,
      product: item.product,
    }));
  };

  const { cart } = useCart(user?._id);

  const [cartRecoil, setCart] = useRecoilState(cartState);

  const isClient = useClientSide();

  useEffect(() => {
    setCart(!isEmpty(cart) ? formatCart(cart) : []);
  }, [cart]);

  return (
    <>
      {isClient && (
        <Badge badgeContent={cartRecoil?.length || 0}>
          <Button icon internalLink={PATH.home} wrapper="absolute top-2/4 -translate-y-2/4">
            <BasketIcon />
          </Button>
        </Badge>
      )}
    </>
  );
}
