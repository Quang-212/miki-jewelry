import Avatar from 'src/components/Avatar';
import { images } from 'src/constants';

export default function ReviewItem() {
  return (
    <div className="grid grid-cols-12 gap-y-1">
      <div className="col-span-1 row-span-4 w-16 h-16">
        <Avatar name="ngoc khoi" imageUrl={images.adminAvatar} width="100" height="100" />
      </div>
      <p className="col-span-11">Pham Ngoc Khoi</p>
      <div className="col-span-11">* * * * *</div>
      <p className="col-span-11 mt-2">
        Rất hài lòng! Gọn nhẹ chắc chắn , giúp máy giảm nóng rõ rệt khi sử dụng và nhất là có thể
        điều chỉnh độ cao màn hình cho phù hợp với tầm mắt của mỗi người sao cho nhìn tốt nhất , đặc
        biệt cho những người phải đeo kính . Ai có laptop thì nhất định phải mua nhe À còn có thể
        xếp lại mang theo vô cùng tiện lợi
      </p>
      <p className="col-span-11 mt-2">2022- 05-23 14:21 | Loại sản phẩm: Bông tai Elean Vàng, 16</p>
    </div>
  );
}
