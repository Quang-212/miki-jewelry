import Button from 'src/components/Button';
import Page from 'src/components/Page';
import { OrderGeneralInformation, OrderMainInformation } from 'src/container/user';
import { useOrderDetails, useRouter } from 'src/hooks';
import MainLayout from 'src/layouts/MainLayout';

OrderDetails.getLayout = (page) => <MainLayout variant="user">{page}</MainLayout>;

export default function OrderDetails() {
  const { query } = useRouter();
  const { order } = useOrderDetails(query.id);

  return (
    <>
      <Page
        data={{
          title: 'Đơn hàng ...',
        }}
      />
      <OrderGeneralInformation />
      <OrderMainInformation order={order} />
      <div className="flex gap-4">
        <Button text title="font-bold hover:underline underline-offset-4">
          Quay lại quản lý đơn hàng
        </Button>
        <Button primary>Theo dõi đơn hàng</Button>
      </div>
    </>
  );
}
