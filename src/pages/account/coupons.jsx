import MainLayout from 'src/layouts/MainLayout';

Coupons.getLayout = (page) => <MainLayout variant="user">{page}</MainLayout>;

export default function Coupons() {
  return <div>coupons</div>;
}
