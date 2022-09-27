import Page from 'src/components/Page';
import { OrderMainInformation } from 'src/container/user';
import { useOrderDetails, useRouter } from 'src/hooks';
import MainLayout from 'src/layouts/MainLayout';

OrderDetails.getLayout = (page) => <MainLayout variant="user">{page}</MainLayout>;

export default function OrderDetails() {
  const { query } = useRouter();
  const { order } = useOrderDetails(query.id);
  console.log(order);

  return (
    <>
      <Page
        data={{
          title: 'Đơn hàng ...',
        }}
      />
      <h2 className="font-primary font-bold text-32-px leading-10 text-primary">
        Chi tiết đơn hàng #967929540-Giao hàng thành công
      </h2>
      <p>
        Ngày đặt hàng: <time>13:28 11/02/2022</time>
      </p>
      <div className="flex flex-col gap-4">
        <p className="uppercase">Thông báo</p>
        <div className="flex gap-8 py-2 px-4 bg-neutral-5">
          <time>08:26 14/02/2022</time>
          <p>
            Đơn hàng 967929540 đã được bàn giao đến đối tác vận chuyển TED. Đơn hàng sẽ được giao
            trước 23:59 ngày 14/02/2022. Quý khách vui lòng giữ liên lạc qua điện thoại.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-x-4">
        <p className="col-span-4 uppercase">Địa chỉ người nhận</p>
        <p className="col-span-4 uppercase">Hình thức giao hàng</p>
        <p className="col-span-4 uppercase">Hình thức thanh toán</p>
        <div className="col-span-4 flex flex-col gap-2 bg-neutral-5 mt-4 py-2 px-4">
          <h5 className="heading-5">Phạm Ngọc Khôi</h5>
          <p>
            Địa chỉ: 66/2/1 Hiệp Bình, Phường Hiệp Bình Phước, Quận Thủ Đức, Hồ Chí Minh, Việt Nam
          </p>
          <p>Điện thoại: 0963799244</p>
        </div>
        <div className="col-span-4 flex flex-col gap-1 bg-neutral-5 mt-4 py-2 px-4">
          <h5 className="heading-5">MikiFast Giao Tiết Kiệm</h5>
          <p>Giao vào Thứ tư, 16/02</p>
          <p>Được giao bởi TikiNOW Smart Logistics (giao từ Hà Nội)</p>
          <p>Phí vận chuyển: 5.000đ</p>
        </div>
        <div className="col-span-4 flex flex-col gap-2 bg-neutral-5 mt-4 py-2 px-4">
          <h5 className="heading-5">Thanh toán bằng thẻ Visa •• 5289</h5>
          <p>Thanh toán thành công</p>
          <p>Số thẻ: **********5289</p>
        </div>
      </div>
      <OrderMainInformation />
    </>
  );
}
