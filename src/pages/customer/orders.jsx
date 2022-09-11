import Breadcrumb from 'src/components/Breadcrumb';
import Page from 'src/components/Page';
import { images } from 'src/constants';
import { Banner, OrdersManagement } from 'src/container/orders';
import MainLayout from 'src/layouts/MainLayout';
import { PATH } from 'src/routes';

Orders.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default function Orders() {
  const breadcrumbs = [
    { label: 'Tài khoản', href: PATH.profile },
    { label: 'Quản lý đơn hàng', href: PATH.orders },
  ];

  return (
    <>
      <Page
        data={{
          title: 'Quản lý đơn hàng',
          description: '',
          url: PATH.orders,
          thumbnailUrl: images.accountProfileBanner,
        }}
      />
      <Banner />
      <div className="container mt-10 flex flex-col gap-10">
        <Breadcrumb breadcrumbs={breadcrumbs} />
        <h2 className="heading-2">Quản lý đơn hàng</h2>
      </div>
      <OrdersManagement />
    </>
  );
}
