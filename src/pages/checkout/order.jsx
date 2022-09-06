import Breadcrumb from 'src/components/Breadcrumb';
import Page from 'src/components/Page';
import { Form, Invoice } from 'src/container/order';
import MainLayout from 'src/layouts/MainLayout';
import { PATH } from 'src/routes';

Order.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default function Order() {
  const breadcrumbs = [
    { label: 'Giỏ hàng', href: PATH.cart },
    { label: 'Trang giao hàng', href: PATH.order },
  ];

  return (
    <>
      <Page
        data={{
          title: 'Trang giao hàng',
          description: '',
          url: PATH.order,
          thumbnailUrl: '',
        }}
      />
      <div className="flex flex-col gap-11 mt-10 container">
        <Breadcrumb breadcrumbs={breadcrumbs} />
        <h2 className="heading-2">Trang giao hàng</h2>
        <div className="flex justify-between gap-10">
          <Form />
          <Invoice />
        </div>
      </div>
    </>
  );
}