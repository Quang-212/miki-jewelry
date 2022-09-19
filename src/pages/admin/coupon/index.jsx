import Page from 'src/components/Page';
import MainLayout from 'src/layouts/MainLayout';
import { CouponList } from 'src/container/admin/coupon';
import { AdminGuard } from 'src/Guard';

CouponPage.getLayout = (page) => <MainLayout variant="admin">{page}</MainLayout>;

export default function CouponPage() {
  return (
    <AdminGuard>
      <Page
        data={{
          title: 'Miki Shop',
          description: '',
          url: '',
          thumbnailUrl: '',
        }}
      />
      <CouponList />
    </AdminGuard>
  );
}
