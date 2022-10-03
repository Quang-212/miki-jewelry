import Breadcrumb from 'src/components/Breadcrumb';
import Page from 'src/components/Page';
import { images } from 'src/constants';
import { OrdersList } from 'src/container/user';
import AuthGuard from 'src/guard/AuthGuard.js';
import MainLayout from 'src/layouts/MainLayout';
import { PATH } from 'src/routes';

Orders.getLayout = (page) => <MainLayout variant="user">{page}</MainLayout>;

const breadcrumbs = [
  { label: 'Tài khoản', href: PATH.PROFILE },
  { label: 'Quản lý đơn hàng', href: PATH.ORDERS },
];

export default function Orders() {
  return (
    <AuthGuard>
      <Page
        data={{
          title: 'Quản lý đơn hàng',
          description: '',
          url: PATH.ORDERS,
          thumbnailUrl: images.accountProfileBanner,
        }}
      />
      <Breadcrumb breadcrumbs={breadcrumbs} />
      <h2 className="font-primary font-bold text-32-px leading-10 text-primary">
        Quản lý đơn hàng
      </h2>
      <OrdersList />
    </AuthGuard>
  );
}
