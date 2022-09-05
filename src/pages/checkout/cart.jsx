import Breadcrumb from 'src/components/Breadcrumb';
import Page from 'src/components/Page';
import { Calculation, CartDetail } from 'src/container/cart';
import MainLayout from 'src/layouts/MainLayout';
import { PATH } from 'src/routes';

Cart.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default function Cart() {
  const breadcrumbs = [{ label: 'Giỏ hàng', href: PATH.cart }];

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
        <div className="flex justify-between gap-[138px]">
          <CartDetail />
          <Calculation />
        </div>
      </div>
    </>
  );
}
