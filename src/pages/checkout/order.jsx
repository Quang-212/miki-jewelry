import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import Breadcrumb from 'src/components/Breadcrumb';
import Button from 'src/components/Button';
import Dialog from 'src/components/Dialog';
import Page from 'src/components/Page';
import { Form, Invoice } from 'src/container/order';
import MainLayout from 'src/layouts/MainLayout';
import { cartState } from 'src/recoils';
import { PATH } from 'src/routes';

Order.getLayout = (page) => <MainLayout>{page}</MainLayout>;

const breadcrumbs = [
  { label: 'Giỏ hàng', href: PATH.cart },
  { label: 'Trang giao hàng', href: PATH.ORDER },
];

export default function Order() {
  const [isOpen, setIsOpen] = useState(false);

  const [address, setAddress] = useState({
    provinces: null,
    districts: null,
    wards: null,
  });

  const cart = useRecoilValue(cartState);

  useEffect(() => {
    cart.length === 0 && setIsOpen(true);
  }, []);

  return (
    <>
      <Page
        data={{
          title: 'Trang giao hàng',
          description: '',
          url: PATH.ORDER,
          thumbnailUrl: '',
        }}
      />
      <div className="flex flex-col gap-11 mt-10 container">
        <Breadcrumb breadcrumbs={breadcrumbs} />
        <h2 className="heading-2">Trang giao hàng</h2>
        <div className="flex justify-between gap-10">
          <Form address={address} setAddress={setAddress} />
          <Invoice address={address} />
        </div>
      </div>
      <Dialog isOpen={isOpen} closeModal={() => {}} content="w-[600px] px-12">
        <div className="flex flex-col gap-4">
          <p className="heading-5">Giỏ hàng của bạn đang trống.</p>
          <p className="">
            Một số sản phẩm trong giỏ hàng vừa được cập nhật, bạn vui lòng kiểm tra giỏ hàng và thử
            lại.
          </p>
          <div className="flex justify-end mt-4">
            <Button primary internalLink="/checkout/cart" wrapper="w-40">
              Đồng ý
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  );
}
