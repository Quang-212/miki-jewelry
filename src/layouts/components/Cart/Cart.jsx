import Tippy from '@tippyjs/react/headless';
import { isEmpty } from 'lodash';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import Badge from 'src/components/Badge';
import Button from 'src/components/Button';
import { NormalDivider } from 'src/components/Dividers';
import { BasketIcon } from 'src/components/Icons';
import Image from 'src/components/Image';
import { Wrapper as PopperWrapper } from 'src/components/Popper';
import { images } from 'src/constants';
import { useClientSide } from 'src/hooks';
import useCart from 'src/hooks/useCart';
import { cartState, totalCartState, userState } from 'src/recoils';
import { formatVndCurrency } from 'src/utils/formatNumber';
import CartReviewItem from './CartReviewItem';

export default function Cart() {
  const [cartRecoil, setCart] = useRecoilState(cartState);

  const totalCart = useRecoilValue(totalCartState);
  const totalPrice = formatVndCurrency(totalCart);

  const { user } = useRecoilValue(userState);

  const { cart } = useCart(user?._id);

  const isClient = useClientSide();

  useEffect(() => {
    setCart(!isEmpty(cart) ? cart : []);
  }, [cart]);

  const renderCartReview = (attrs) => {
    return (
      <div className="w-[480px]" tabIndex="-1" {...attrs}>
        <PopperWrapper className="h-fit flex flex-col gap-3 py-5 px-4">
          {!isEmpty(cart) ? (
            <>
              <h5 className="heading-5">Giỏ hàng</h5>
              <NormalDivider />
              <ul className="flex flex-col gap-2 max-h-100 px-2 divide-y-[1.5px] divide-dashed overflow-y-scroll">
                {cartRecoil.map((cartItem) => (
                  <li key={cartItem._id}>
                    <CartReviewItem data={cartItem} />
                  </li>
                ))}
              </ul>
              <NormalDivider />
              <div className="grid grid-cols-2 gap-4 gap-x-6 mt-2">
                <p className="text-xl">Tổng tiền:</p>
                <span className="justify-self-end heading-5 text-primary-2">{totalPrice}</span>
                <Button outline internalLink="/checkout/cart">
                  Xem giỏ hàng
                </Button>
                <Button primary internalLink="/checkout/order">
                  Thanh toán
                </Button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center gap-8">
              <Image src={images.adminAvatar} alt="Ảnh giỏ hàng trống" width={200} height={200} />
              <p>Hiện chưa có sản phẩm</p>
              <Button primary internalLink="/products">
                Mua ngay
              </Button>
            </div>
          )}
        </PopperWrapper>
      </div>
    );
  };

  return (
    <>
      {isClient && (
        <Tippy
          interactive
          placement="bottom-end"
          delay={[200, 400]}
          offset={[108, 16]}
          render={renderCartReview}
        >
          <Badge badgeContent={cartRecoil?.length || 0}>
            <Button icon internalLink="/checkout/cart" wrapper="absolute top-2/4 -translate-y-2/4">
              <BasketIcon />
            </Button>
          </Badge>
        </Tippy>
      )}
    </>
  );
}
