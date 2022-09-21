import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import Breadcrumb from 'src/components/Breadcrumb';
import Button from 'src/components/Button';
import Image from 'src/components/Image';
import Page from 'src/components/Page';
import { images } from 'src/constants';
import { Calculation, CartDetail } from 'src/container/cart';
// import AuthGuard from 'src/guard/AuthGuard';
import { useClientSide } from 'src/hooks';
import MainLayout from 'src/layouts/MainLayout';
import { cartState } from 'src/recoils';
import { PATH } from 'src/routes';

Cart.getLayout = (page) => <MainLayout>{page}</MainLayout>;

const breadcrumbs = [{ label: 'Giỏ hàng', href: PATH.cart }];

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

  return (
    <>
      {isClient && (
        <>
          <Page
            data={{
              title: 'Giỏ hàng',
            }}
          />
          <div className="flex flex-col gap-12 mt-5 py-10 container bg-neutral-5">
            <Breadcrumb breadcrumbs={breadcrumbs} />
            {!isEmpty(cart) ? (
              <div className="flex justify-between gap-[138px]">
                <CartDetail checked={checked} setChecked={setChecked} />
                <Calculation checked={checked} />
              </div>
            ) : (
              <div className="flex flex-col items-center gap-8">
                <Image src={images.adminAvatar} alt="Ảnh giỏ hàng trống" width={200} height={200} />
                <p>Giỏ hàng của bạn còn trống</p>
                <Button primary internalLink="/products">
                  Mua ngay
                </Button>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}
