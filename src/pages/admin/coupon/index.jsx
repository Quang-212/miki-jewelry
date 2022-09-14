import Page from 'src/components/Page';
import MainLayout from 'src/layouts/MainLayout';
import { CouponList } from 'src/container/admin/coupon';

CouponPage.getLayout = (page) => <MainLayout variant="admin">{page}</MainLayout>;

export default function CouponPage() {
  return (
    <>
      <Page
        data={{
          title: 'Miki Shop',
          description: '',
          url: '',
          thumbnailUrl: '',
        }}
      />
      <CouponList />
    </>
  );
}
