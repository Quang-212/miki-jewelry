import { useRecoilValue } from 'recoil';

import Breadcrumb from 'src/components/Breadcrumb';
import Button from 'src/components/Button';
import Image from 'src/components/Image';
import Page from 'src/components/Page';
import { images } from 'src/constants';
import { Calculation, CartDetail } from 'src/container/cart';
import MainLayout from 'src/layouts/MainLayout';
import { cartState } from 'src/recoils';
import { PATH } from 'src/routes';

Cart.getLayout = (page) => <MainLayout>{page}</MainLayout>;

const breadcrumbs = [{ label: 'Giỏ hàng', href: PATH.cart }];

export default function Cart() {
  const cart = useRecoilValue(cartState);

  return (
    <>
      <Page
        data={{
          title: 'Giỏ hàng',
          description: '',
          url: PATH.cart,
          thumbnailUrl: '',
        }}
      />
      <div className="flex flex-col gap-12 mt-5 py-10 container bg-neutral-5">
        <Breadcrumb breadcrumbs={breadcrumbs} />
        {true ? (
          <div className="flex justify-between gap-[138px]">
            <CartDetail />
            <Calculation />
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
  );
}
