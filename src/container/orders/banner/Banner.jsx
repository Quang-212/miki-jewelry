import Image from 'src/components/Image';
import { images } from 'src/constants';

export default function Banner() {
  return (
    <Image
      src={images.accountProfileBanner}
      alt="Ảnh banner trang thông tin khách hàng"
      width={1440}
      height={437}
    />
  );
}
