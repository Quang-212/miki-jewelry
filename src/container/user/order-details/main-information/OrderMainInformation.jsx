import { useState } from 'react';
import Button from 'src/components/Button';
import { NormalDivider } from 'src/components/Dividers';
import Image from 'src/components/Image';
import { images } from 'src/constants';
import { ModalLeaving, ModalReview } from 'src/container/reviews';

export default function OrderMainInformation() {
  const [isOpen, setIsOpen] = useState({
    review: false,
    leaving: false,
  });

  const handleComment = () => {
    setIsOpen((prev) => ({ ...prev, review: true }));
  };

  return (
    <section className="grid grid-cols-12 gap-y-8 bg-neutral-5 py-8 px-6">
      <div className="col-span-12 grid grid-cols-12">
        <span className="col-span-6">Sản phẩm</span>
        <span className="col-span-2 justify-self-center ml-4">Giá</span>
        <span className="col-span-1 justify-self-center">Số lượng</span>
        <span className="col-span-1 justify-self-center">Giảm giá</span>
        <span className="col-span-2 justify-self-center">Tạm tính</span>
      </div>

      <div className="col-span-12 grid grid-cols-12 gap-x-4">
        <div className="col-span-6 grid grid-cols-12 gap-y-2">
          <div className="col-span-2 row-span-4 flex items-start">
            <Image src={images.adminAvatar} alt="" width={80} height={80} />
          </div>
          <p className="col-span-10">
            Giá Đỡ Laptop Hợp Kim Nhôm Cao Cấp Có Thể Gấp Gọn, Giúp Tản Nhiệt Laptop, Macbook, Máy
            Tính Xách Tay. 07 Vị Trí Điều Chỉnh Góc Độ. Hàng Chính Hãng Tamayoko FS060
          </p>
          <p className="col-span-10">Kích thước </p>
          <p className="col-span-10">Sku: 2489747574223</p>
          <Button outline onClick={handleComment} wrapper="col-span-4 mt-2 mr-2">
            Viết nhận xét
          </Button>
          <Button outline wrapper="col-span-4 mt-2 ml-2">
            Mua lại
          </Button>
        </div>
        <span className="col-span-2 justify-self-center">180.000 ₫</span>
        <span className="col-span-1 justify-self-center">1</span>
        <span className="col-span-1 justify-self-center">80000đ</span>
        <span className="col-span-2 justify-self-center">200000đ</span>
      </div>

      <div className="col-span-12 justify-self-end mt-8 grid grid-cols-12 gap-y-4">
        <span className="col-span-6 ">Tạm tính</span>
        <span className="col-span-6 justify-self-end">180.000 ₫</span>
        <span className="col-span-6 ">Phí vận chuyển</span>
        <span className="col-span-6 justify-self-end">5.000 ₫</span>
        <span className="col-span-6">Tổng cộng</span>
        <span className="col-span-6 justify-self-end">185.000 ₫</span>
      </div>

      <ModalReview isOpen={isOpen.review} setIsOpen={setIsOpen} />
      <ModalLeaving isOpen={isOpen.leaving} setIsOpen={setIsOpen} />
    </section>
  );
}
