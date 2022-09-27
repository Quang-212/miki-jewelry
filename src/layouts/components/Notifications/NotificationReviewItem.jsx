import Button from 'src/components/Button';
import { OrderIcon, TicketIcon } from 'src/components/Icons';
import Image from 'src/components/Image';
import { images } from 'src/constants';

export default function NotificationReviewItem() {
  return (
    <div className="grid grid-cols-12 px-4 bg-orange-50 hover:bg-wrapper">
      <div className="col-span-2 row-span-2 flex items-center">
        {/* <Image src={images.orderIcon} alt="Ảnh giỏ hàng trống" width={50} height={50} /> */}
        <TicketIcon width={60} height={60} />
      </div>
      <p
        onClick={() => {
          console.log('hello');
        }}
        className="col-span-10 cursor-pointer"
      >
        Miki đã nhận được thanh toán, thông tin chi tiết về đơn hàng sẽ được gửi qua email quý khách
        sớm nhất
      </p>
      <time className="col-span-3 mt-1">27/09/2022</time>
      <Button
        text
        wrapper="col-span-5 justify-self-end"
        title="text-caption-2 font-semibold hover:opacity-80"
      >
        Đánh dấu đã đọc
      </Button>
      <Button
        text
        wrapper="col-span-2 justify-self-end"
        title="text-caption-1 font-semibold hover:opacity-80"
      >
        Xóa
      </Button>
    </div>
  );
}
